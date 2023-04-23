const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-middleware');

//GET units user has access to by userId
router.get('/:userId', rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
  SELECT * FROM "users_units" WHERE "users_id" = $1
  `;
    const queryParams = [req.params.userId];
    const queryResult = await pool.query(queryText, queryParams);
    userUnits = queryResult.rows;
    admittedUnits = userUnits.map((userUnit, i) => {
      return userUnit.units_id;
    });
    res.send(admittedUnits);
  } catch (error) {
    res.sendStatus(500);
    console.log('Error getting user-unit', error);
  }
});

module.exports = router;
