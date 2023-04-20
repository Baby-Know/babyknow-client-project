const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectStudent } = require("../modules/teacher-middleware");

//GET all students
router.get("/", rejectUnauthenticated, rejectStudent, async (req, res) => {
  //Array to send back to client
  const studentData = {
    students: [],
    cohorts: [],
    units: [],
  };

  try {
    const studentsQuery = `
    SELECT * FROM "users" 
    WHERE "access" = 1;
    `;

    const studentsResponse = await pool.query(studentsQuery);
    const allStudents = studentsResponse.rows;

    //Mapping over all of the students
    await Promise.all(
      allStudents.map(async (student) => {
        let studentObject = {
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          cohort: {
            id: null,
            name: "",
          },
          teacher: {
            id: null,
            firstName: "",
            lastName: "",
          },
          studentUnits: [],
        };

        const usersCohortsStudentQuery = `
        SELECT 
           uc.cohorts_id, c.name FROM "users_cohorts" AS UC
        JOIN "cohorts" AS c ON uc.cohorts_id = c.id
        WHERE uc.user_id = $1;
        `;

        // Selecting student's cohort details
        const usersCohortsStudentResponse = await pool.query(
          usersCohortsStudentQuery,
          [student.id]
        );

        studentObject = {
          ...studentObject,
          cohort: {
            id: usersCohortsStudentResponse.rows[0].cohorts_id,
            name: usersCohortsStudentResponse.rows[0].name,
          },
        };

        //Selecting the student's teacher
        const usersCohortsTeacherQuery = `
        SELECT 
            uc.user_id, u."firstName", u."lastName" FROM "users_cohorts" AS uc
        JOIN "users" AS u ON u.id = uc.user_id
        WHERE u.access >= 2 AND uc.cohorts_id = $1;
        `;

        const usersCohortsTeacherResponse = await pool.query(
          usersCohortsTeacherQuery,
          [usersCohortsStudentResponse.rows[0].cohorts_id]
        );
        
        studentObject = {
          ...studentObject,
          teacher: {
            id: usersCohortsTeacherResponse.rows[0].user_id,
            firstName: usersCohortsTeacherResponse.rows[0].firstName,
            lastName: usersCohortsTeacherResponse.rows[0].lastName,
          },
        };

        const usersUnitsQuery = `
        SELECT 
            uu.id, u.id, u.name FROM "users_units" AS uu
        JOIN "units" AS u ON uu.units_id = u.id
        WHERE uu.users_id = $1;
        `;

        const usersUnitsResponse = await pool.query(usersUnitsQuery, [
          student.id,
        ]);

        studentObject.studentUnits = usersUnitsResponse.rows;

        studentData.students.push(studentObject);
      })
    );

    const cohortsQuery = `
    SELECT * FROM "cohorts";
    `;

    const cohortsResponse = await pool.query(cohortsQuery);

    studentData.cohorts = cohortsResponse.rows;

    const unitsQuery = `
    SELECT * FROM "units";
    `;
    const unitsResponse = await pool.query(unitsQuery);

    studentData.units = unitsResponse.rows;

    res.send(studentData);
  } catch (error) {
    console.log(`Error fetching students : `, error);
    res.sendStatus(500);
  }
});

router.put("/:id", rejectUnauthenticated, rejectStudent, async (req, res) => {
  const connection = await pool.connect();
  const studentId = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const cohort = req.body.cohort;
  const studentUnits = req.body.studentUnits;

  try {
    await connection.query("BEGIN");
    const usersQueryText = `
    UPDATE "users"
    SET "firstName" = $1, "lastName" = $2, "email" = $3
    WHERE "id" = $4;
    `;
    await connection.query(usersQueryText, [
      firstName,
      lastName,
      email,
      studentId,
    ]);

    const usersCohortsQueryText = `
    UPDATE "users_cohorts"
    SET "cohorts_id" = $1
    WHERE "user_id" = $2;
    `;
    await connection.query(usersCohortsQueryText, [cohort.id, studentId]);

    //Query to delete all of the student's previous units
    const deleteUsersUnitsQueryText = `
    DELETE FROM "users_units" 
    WHERE "users_id" = $1;
    `;
    await connection.query(deleteUsersUnitsQueryText, [studentId]);

    //Map over the array of the students new unit objects and insert new values
    await Promise.all(
      studentUnits.map(async (unit) => {
        const updateUsersUnitsQueryText = `
        INSERT INTO "users_units" ("users_id", "units_id")
        VALUES ($1, $2);
        `;
        return await connection.query(updateUsersUnitsQueryText, [
          studentId,
          unit.id,
        ]);
      })
    );

    //Delete user_content by user ID to update
    const deleteUserContentQueryText = `
      DELETE FROM "users_content"
      WHERE "user_id" = $1;
  `;
    await connection.query(deleteUserContentQueryText, [studentId]);

    //Map over array of units by ID to insert user-content relationship into user_content table
    await Promise.all(
      studentUnits.map(async (unit) => {
        const selectContentIdsText = `
      SELECT "content".id AS "contentId" FROM "units"
      JOIN "lessons" ON "lessons".units_id = "units".id
      JOIN "content" ON "content".lessons_id = "lessons".id
      WHERE "units".id = $1;
      `;
        const selectContentIdsParams = [unit.id];
        const result = await pool.query(
          selectContentIdsText,
          selectContentIdsParams
        );
        const contentIds = result.rows;

        await Promise.all(
          contentIds.map(async (contentId) => {
            const insertUserContentText = `
            INSERT INTO "users_content" ("user_id", "content_id")
            VALUES ($1, $2)
          `;
            const insertUserContentParams = [studentId, contentId.contentId];
            return await connection.query(
              insertUserContentText,
              insertUserContentParams
            );
          })
        );
      })
    );

    await connection.query("COMMIT");
    res.sendStatus(204);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back student update`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.delete(
  "/:id",
  rejectUnauthenticated,
  rejectStudent,
  async (req, res) => {
    try {
      const queryText = `
    DELETE FROM "users"
    WHERE "id" = $1
    `;

      await pool.query(queryText, [req.params.id]);
      res.sendStatus(204);
    } catch (error) {
      console.log(`Error deleting student :`, error);
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  }
);

// gets all students who share cohort with teacher id
router.get("/:id", rejectUnauthenticated, async (req, res) => {
    try {
      const cohortQuery = `
      SELECT "users_cohorts".cohorts_id FROM "users_cohorts"
      WHERE "users_cohorts".user_id = $1;
      `;

      const cohortResults = await pool.query(cohortQuery, [req.params.id]);
      const cohortId = cohortResults.rows[0]

      const studentsQuery = `
      SELECT "users".id, "users"."firstName", "users"."lastName", "users".email, "cohorts".name AS "cohort" FROM "users"
      JOIN "users_cohorts" ON "users_cohorts".user_id = "users".id
      JOIN "cohorts" ON "cohorts".id = "users_cohorts".cohorts_id
      WHERE "users_cohorts".cohorts_id = $1 AND "users".access = 1;     
      `

      const results = await pool.query(studentsQuery, [cohortId.cohorts_id]);



      res.send(results.rows);
    } catch (error) {
      console.log(`Error getting students :`, error);
      res.sendStatus(500);
    }
  }
);


// updates student cohort to teachers cohort
router.put("/", rejectUnauthenticated, async (req, res) => {
  console.log(req.body)
  try {
    const cohortQuery = `
    SELECT "users_cohorts".cohorts_id FROM "users_cohorts"
    WHERE "users_cohorts".user_id = $1;
    `;

    const cohortResults = await pool.query(cohortQuery, [req.body.teacherId]);
    const cohortId = cohortResults.rows[0].cohorts_id

    const studentsQuery = ` 
    UPDATE "users_cohorts"
    SET "cohorts_id" = $1
    WHERE "user_id" = $2; 
    `

    await pool.query(studentsQuery, [cohortId, req.body.studentId]);

    res.sendStatus(201);
  } catch (error) {
    console.log(`Error updating student cohort :`, error);
    res.sendStatus(500);
  }
}
);


module.exports = router;
