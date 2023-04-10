const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

const { rejectNonAdmin } = require('../modules/admin-middleware');

//GET units
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
        SELECT * FROM "users" 
        WHERE`;
  } catch (error) {}
});
