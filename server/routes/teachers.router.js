const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectStudent } = require("../modules/teacher-middleware");

// GET all teachers and their students
router.get("/", rejectUnauthenticated, rejectStudent, async (req, res) => {
  try {
    const queryText = `
SELECT 
    teachers.id AS "teacherId", 
    teachers."firstName" AS "teacherFirstName", 
    teachers."lastName" AS "teacherLastName",
    json_agg(json_build_object(
        'id', students.id, 
        'firstName', students."firstName", 
        'lastName', students."lastName"
    )) AS students
FROM "users_cohorts"
JOIN "users" AS students 
    ON students.id = "users_cohorts".user_id AND students.access = 1
JOIN "cohorts" 
    ON "cohorts".id = "users_cohorts".cohorts_id
JOIN "users_cohorts" AS teacher_link 
    ON teacher_link.cohorts_id = "cohorts".id
JOIN "users" AS teachers 
    ON teachers.id = teacher_link.user_id AND teachers.access = 2
GROUP BY teachers.id, teachers."firstName", teachers."lastName";
    `;

    const result = await pool.query(queryText);
    res.send(result.rows);
  } catch (error) {
    console.log("Error fetching teachers and their students", error);
    res.sendStatus(500);
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
