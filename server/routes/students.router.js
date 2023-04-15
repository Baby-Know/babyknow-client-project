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
    teachers: [],
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
          userUnits: [],
        };

        const usersCohortsStudentQuery = `
        SELECT uc.cohorts_id, c.name FROM "users_cohorts" AS UC
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
        SELECT uc.user_id, u."firstName", u."lastName" FROM "users_cohorts" AS uc
        JOIN "users" AS u ON u.id = uc.user_id
        WHERE u.access = 2 AND uc.cohorts_id = $1;
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
        SELECT uu.id, u.id, u.name FROM "users_units" AS uu
        JOIN "units" AS u ON uu.units_id = u.id
        WHERE uu.users_id = $1;
        `;

        const usersUnitsResponse = await pool.query(usersUnitsQuery, [
          student.id,
        ]);

        studentObject.userUnits = usersUnitsResponse.rows;

        studentData.students.push(studentObject);
      })
    );

    //Selecting all teachers and adding them to the teachers array
    const usersTeacherQuery = `
    SELECT "id", "email", "firstName", "lastName", "organization" FROM "users" WHERE "users".access = 2;
    `;

    const usersTeacherResponse = await pool.query(usersTeacherQuery);

    studentData.teachers = usersTeacherResponse.rows;

    const cohortsQuery = `
    SELECT * FROM "cohorts"
    `;

    const cohortsResponse = await pool.query(cohortsQuery);

    studentData.cohorts = cohortsResponse.rows;

    const unitsQuery = `
    SELECT * FROM "units"
    `;
    const unitsResponse = await pool.query(unitsQuery);

    studentData.units = unitsResponse.rows;

    res.send(studentData);
  } catch (error) {
    console.log(`Error fetching students : `, error);
    res.sendStatus(500);
  }
});

module.exports = router;
