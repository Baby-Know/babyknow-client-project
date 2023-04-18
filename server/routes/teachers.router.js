const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectStudent } = require("../modules/teacher-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");

router.get("/", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  const objectToSend = {
    teachers: [],
    allCohorts: [],
  };

  try {
    //Selecting all teachers and details about them
    const usersQuery = `
 SELECT
    u.id AS "usersId",
    u.email, 
    u."firstName", 
    u."lastName", 
    u.access, 
    u.organization,
    "c".name AS "cohort",
    "c".id AS "cohortsId"
FROM "users" AS u
JOIN "users_cohorts" AS uc
    ON u.id = uc.user_id
JOIN "cohorts" AS c
    ON c.id = uc.cohorts_id
WHERE u.access >= 2
GROUP BY      
    u.id,
    u.email, 
    u."firstName", 
    u."lastName", 
    u.access, 
    u.organization,
    c.name,
    c.id;
  `;

    const usersResult = await pool.query(usersQuery);
    const teachers = usersResult.rows;

    objectToSend.teachers = teachers;

    //Selecting all cohorts for select on the client side
    const cohortsQuery = `
    SELECT * FROM "cohorts"; 
    `;

    const cohortsResult = await pool.query(cohortsQuery);

    objectToSend.allCohorts = cohortsResult.rows;

    //Unique Id for datagrid so that we can have teachers with multiple cohorts
    objectToSend.teachers = objectToSend.teachers.map((teacher, i) => ({
      ...teacher,
      id: i,
    }));

    res.send(objectToSend);
  } catch (error) {
    console.log("Error fetching all teachers:", error);
    res.sendStatus(500);
  }
});

//UPDATE TEACHER
router.put("/:id", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  const connection = await pool.connect();
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const access = req.body.access;
  const organization = req.body.organization;
  const id = req.body.usersId;
  const cohortsId = req.body.cohortsId;

  try {
    await connection.query("BEGIN");

    const usersQueryText = `
    UPDATE "users"
    SET 
     "email" = $1,
     "firstName" = $2,     
     "lastName" = $3,
     "access" = $4,
     "organization" = $5
     WHERE "id" = $6;
    `;

    await connection.query(usersQueryText, [
      email,
      firstName,
      lastName,
      access,
      organization,
      id,
    ]);

    const usersCohortsQueryText = `
    UPDATE "users_cohorts"
    SET "cohorts_id" = $1
    WHERE "user_id" = $2;
    `;

    await connection.query(usersCohortsQueryText, [cohortsId, id]);
    await connection.query("COMMIT");
    res.sendStatus(204);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log("Error updating teacher :", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

//DELETE TEACHER
router.delete(
  "/:id/:cohortId",
  rejectUnauthenticated,
  rejectNonAdmin,
  async (req, res) => {
    const connection = await pool.connect();
    const cohortId = Number(req.params.cohortId);
    const teacherId = Number(req.params.id);

    try {
      await connection.query("BEGIN");

      //First we have to go find all of the teachers students and swap their teachers to be BabyKnow
      const usersCohortsQuery = `
      SELECT u.id
      FROM "users" AS u
      JOIN "users_cohorts" AS uc
          ON uc."user_id" = u.id
      WHERE u."access" = 1 AND uc."cohorts_id" = $1
      `;

      const usersCohortsResponse = await connection.query(usersCohortsQuery, [
        cohortId,
      ]);

      const students = usersCohortsResponse.rows;

      //Map over all students of the teacher to be deleted and change their teacher
      await Promise.all(
        students.map((student) => {
          const usersCohortsStudentQuery = `
          UPDATE "users_cohorts"
          SET "cohorts_id" = 1
          WHERE "user_id" = $1
          `;
          return connection.query(usersCohortsStudentQuery, [student.id]);
        })
      );

      //Finally after students are changed we can delete teacher
      const usersQueryText = `
        DELETE FROM "users"
        WHERE "id" = $1
        `;

      await connection.query(usersQueryText, [teacherId]);
      await connection.query("COMMIT");
      res.sendStatus(204);
    } catch (error) {
      await connection.query("ROLLBACK");
      console.log("Error deleting teacher :", error);
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  }
);

module.exports = router;
