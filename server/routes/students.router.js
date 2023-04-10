const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const { rejectStudent } = require('../modules/teacher-middleware');

//GET all students
router.get('/', rejectUnauthenticated, rejectStudent, async (req, res) => {
  try {
    const queryText = `
        SELECT * FROM "users" 
        WHERE "access" = 1
        `;
    const students = await pool.query(queryText);
    res.send(students.rows);
  } catch (error) {
    res.sendStatus(500);
    console.log('Error getting students:', error);
  }
});

module.exports = router;
