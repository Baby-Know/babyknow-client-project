const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");

//GET NEW REGISTRANTS
router.get("/", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
    SELECT * FROM "users" WHERE "access" = 0
    `;
    const response = await pool.query(queryText);

    res.send(response.rows);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error posting Cohort :", error);
  }
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
