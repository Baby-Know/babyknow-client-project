const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

//POST new unit
router.post("/", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
    INSERT INTO "units" ("name", "unitOrder", "subtitle")
    VALUES($1, $2, $3)
    `;

    await pool.query(queryText, [
      req.body.name,
      req.body.unitOrder,
      req.body.subtitle,
    ]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error posting unit :", error);
  }
});

module.exports = router;
