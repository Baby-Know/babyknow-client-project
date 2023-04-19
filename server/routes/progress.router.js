const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, async (req, res) => {
  try {
    const progress = [];

    const unitsQuery = `
    SELECT "users_units".units_id FROM "users_units"
    WHERE "users_units".users_id = $1;`;

    const results = await pool.query(unitsQuery, [req.params.id]);
    const unitIds = results.rows;

    await Promise.all(
      unitIds.map(async (unit, i) => {
        const progressQuery = `
            SELECT "units".name, "users_content"."isComplete" FROM "users_content"
            JOIN "content" ON "content".id = "users_content".content_id
            JOIN "lessons" ON "lessons".id = "content".lessons_id
            JOIN "units" ON "units".id = "lessons".units_id
            WHERE "units".id = $1 AND "users_content".user_id = $2;`;

        const results = await pool.query(progressQuery, [
          unit.units_id,
          req.params.id,
        ]);
        progress.push(results.rows);
      })
    );

    res.send(progress);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error posting Cohort :", error);
  }
});

module.exports = router;
