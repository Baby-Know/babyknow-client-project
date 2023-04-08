const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");

//GET units
router.get("/", rejectUnauthenticated, async (req, res) => {
  try{
    const queryText = `
    SELECT * FROM "units"
    `;
     const unitResult = await pool.query(queryText)
    units = unitResult.rows
    res.send(units)
    console.log("units", units)
  } catch(error){
    res.sendStatus(500);
    console.log("Error getting unit:", error);
  }
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
