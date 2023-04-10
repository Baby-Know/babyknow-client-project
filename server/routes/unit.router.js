const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");

//GET all units
router.get("/", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
    SELECT * FROM "units"
    `;
    const unitResult = await pool.query(queryText);
    units = unitResult.rows;
    res.send(units);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error getting unit:", error);
  }
});

//GET specific unit
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
    SELECT "units".name AS "unitsName", "units".subtitle, "lessons".name AS "lessonsName", "lessons".description, "lessonOrder" FROM "units"
    JOIN "lessons" ON "lessons".units_id = "units".id
    WHERE "units".id = $1
    ORDER BY "lessonOrder" ASC
    `;
    const params = [req.params.id]
    const unitResult = await pool.query(queryText, params);
    units = unitResult.rows;
    res.send(units);
  } catch (error) {
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

router.put("/:id", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
    UPDATE "units"
    SET "name" = $1, "unitOrder" = $2, "subtitle" = $3
    WHERE "id" = $4
    `;

    await pool.query(queryText, [
      req.body.name,
      req.body.unitOrder,
      req.body.subtitle,
      req.params.id,
    ]);

    res.sendStatus(200);
  } catch (error) {
    console.log("Error editing unit :", error);
  }
});

//DELETE new unit
router.delete(
  "/:id",
  rejectUnauthenticated,
  rejectNonAdmin,
  async (req, res) => {
    try {
      const query = `
      DELETE FROM "units"
      WHERE "units".id = $1;`;

      params = [req.params.id];

      await pool.query(query, params);
      res.sendStatus(200);
    } catch (error) {
      console.log("Error deleting unit :", error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
