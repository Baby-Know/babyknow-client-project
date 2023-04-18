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
    "users".id AS "usersId",
    "users".email, 
    "users"."firstName", 
    "users"."lastName", 
    "users".access, 
    "users".organization,
    "cohorts".name AS "cohort",
    "cohorts".id AS "cohortsId"
FROM "users"
JOIN "users_cohorts"
    ON "users".id = "users_cohorts".user_id
JOIN "cohorts" 
    ON "cohorts".id = "users_cohorts".cohorts_id
WHERE "users".access = 2
GROUP BY      
    "users".id,
    "users".email, 
    "users"."firstName", 
    "users"."lastName", 
    "users".access, 
    "users".organization,
    "cohorts".name,
    "cohorts".id;
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
  console.log("REQQQQ BODY:", req.body);
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
  }
});

//DELETE TEACHER
router.delete(
  "/:id",
  rejectUnauthenticated,
  rejectNonAdmin,
  async (req, res) => {
    try {
      const queryText = `
        DELETE FROM "users"
        WHERE "id" = $1
        `;

      await pool.query(queryText, [req.params.id]);

      res.sendStatus(204);
    } catch (error) {
      console.log("Error deleting teacher :", error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
