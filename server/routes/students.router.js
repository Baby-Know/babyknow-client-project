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
  const studentData = [];

  try {
    const studentsQuery = `
    SELECT * FROM "users" 
    WHERE "access" = 1
    ORDER BY "id";
    `;

    const studentsResponse = await pool.query(studentsQuery);
    const allStudents = studentsResponse.rows;

    //Mapping over all of the students
    await Promise.all(
      allStudents.map(async (student, i) => {
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

        studentData[i] = studentObject;
      })
    );
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
  const updatedStudentUnits = req.body.studentUnits;

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

    //Selecting current units that the student is signed up for
    const usersUnitsQuery = `
    SELECT * FROM "users_units" 
    WHERE "users_units".users_id = $1
    `;

    const usersUnitsResponse = await connection.query(usersUnitsQuery, [
      studentId,
    ]);

    const currentStudentUnits = usersUnitsResponse.rows;

    //This will be comparing what the student has versus what the update contains.
    const matchingUnits = updatedStudentUnits.filter((unit) => {
      return currentStudentUnits.some(
        (currentUnit) => currentUnit.units_id === unit.id
      );
    });

    //Checking if there are units to add
    const unitsToAdd = updatedStudentUnits.filter((unit) => {
      return !matchingUnits.some((matchingUnit) => matchingUnit.id === unit.id);
    });

    //Checking if there are units to remove
    const unitsToRemove = currentStudentUnits.filter((unit) => {
      return !updatedStudentUnits.some(
        (updatedUnit) => updatedUnit.id === unit.units_id
      );
    });

    //Query for selecting the content ids
    const selectContentIdsText = `
      SELECT "content".id AS "contentId" FROM "units"
      JOIN "lessons" ON "lessons".units_id = "units".id
      JOIN "content" ON "content".lessons_id = "lessons".id
      WHERE "units".id = $1;
      `;

    //Mapping over and removing the units and content
    await Promise.all(
      unitsToRemove.map(async (unit) => {
        const deleteUsersUnitsQueryText = `
         DELETE FROM "users_units"
         WHERE "users_id" = $1 AND "units_id" = $2;`;

        //Deleting all of the units
        await connection.query(deleteUsersUnitsQueryText, [
          studentId,
          unit.units_id,
        ]);

        const selectContentIdsParams = [unit.units_id];

        //Grabbing all of the content Ids to give to remove "users_content"
        const contentIdResults = await connection.query(
          selectContentIdsText,
          selectContentIdsParams
        );

        const contentIds = contentIdResults.rows;
        //Mapping over all of the content ids to remove each one from "users_content"
        await Promise.all(
          contentIds.map(async (contentIdObject) => {
            const deleteUserContentText = `
            DELETE FROM "users_content"
            WHERE user_id = $1 and content_id = $2 
            `;
            deleteUserContentParams = [studentId, contentIdObject.contentId];

            return await connection.query(
              deleteUserContentText,
              deleteUserContentParams
            );
          })
        );
      })
    );

    //Mapping over all of the new units and adding them plus their content
    await Promise.all(
      unitsToAdd.map(async (unit) => {
        const insertUsersUnitsQueryText = `
        INSERT INTO "users_units" ("users_id", "units_id")
        VALUES($1, $2)
        `;
        //Inserting all of the new units
        await connection.query(insertUsersUnitsQueryText, [studentId, unit.id]);
        const selectContentIdsParams = [unit.id];

        //Grabbing all of the content Ids to give to add to "users_content"
        const contentIdResults = await connection.query(
          selectContentIdsText,
          selectContentIdsParams
        );
        const contentIds = contentIdResults.rows;

        //Mapping over all of the content ids to add each one into "users_content"
        await Promise.all(
          contentIds.map(async (contentIdObject) => {
            const insertUserContentText = `
              INSERT INTO "users_content" ("user_id", "content_id")
              VALUES ($1, $2);
            `;
            const insertUserContentParams = [
              studentId,
              contentIdObject.contentId,
            ];
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
    const cohortId = cohortResults.rows[0];

    const studentsQuery = `
      SELECT "users".id, "users"."firstName", "users"."lastName", "users".email, "cohorts".name AS "cohort" FROM "users"
      JOIN "users_cohorts" ON "users_cohorts".user_id = "users".id
      JOIN "cohorts" ON "cohorts".id = "users_cohorts".cohorts_id
      WHERE "users_cohorts".cohorts_id = $1 AND "users".access = 1;     
      `;

    const results = await pool.query(studentsQuery, [cohortId.cohorts_id]);
    res.send(results.rows);
  } catch (error) {
    console.log(`Error getting students :`, error);
    res.sendStatus(500);
  }
});

// gets all students who share cohort with teacher id
router.get("/overview/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const studentQuery = `
    SELECT "users"."firstName", "users"."lastName" FROM "users"
    WHERE "users".id = $1  
    `;

    const results = await pool.query(studentQuery, [req.params.id]);

    res.send(results.rows[0]);
  } catch (error) {
    console.log(`Error getting students :`, error);
    res.sendStatus(500);
  }
});

// updates student cohort to teachers cohort
router.put("/", rejectUnauthenticated, async (req, res) => {
  try {
    const cohortQuery = `
    SELECT "users_cohorts".cohorts_id FROM "users_cohorts"
    WHERE "users_cohorts".user_id = $1;
    `;

    const cohortResults = await pool.query(cohortQuery, [req.body.teacherId]);
    const cohortId = cohortResults.rows[0].cohorts_id;

    const studentsQuery = ` 
    UPDATE "users_cohorts"
    SET "cohorts_id" = $1
    WHERE "user_id" = $2; 
    `;

    await pool.query(studentsQuery, [cohortId, req.body.studentId]);

    res.sendStatus(201);
  } catch (error) {
    console.log(`Error updating student cohort :`, error);
    res.sendStatus(500);
  }
});

module.exports = router;
