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
    JOIN "units" ON "units".id = "users_units"."units_id"
    WHERE "users_units".users_id = $1
    ;`;

    const results = await pool.query(unitsQuery, [req.params.id]);
    const unitIds = results.rows;

    await Promise.all(
      unitIds.map(async (unit, i) => {
        const progressQuery = `
            SELECT "units".id, "units".name, "users_content"."isComplete" FROM "users_content"
            JOIN "content" ON "content".id = "users_content".content_id
            JOIN "lessons" ON "lessons".id = "content".lessons_id
            JOIN "units" ON "units".id = "lessons".units_id
            WHERE "units".id = $1 AND "users_content".user_id = $2
            ORDER BY "units"."unitOrder";
            `;

        const results = await pool.query(progressQuery, [
          unit.units_id,
          req.params.id,
        ]);
        progress[i] = results.rows;
      })
    );

    res.send(progress);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error posting Cohort :", error);
  }
});

router.get("/:studentId/:unitId", async (req, res) => {
  
  try {

    const progress = []

    const lessonsQuery = `
    SELECT "lessons".id AS "lessonId" FROM "lessons"
    JOIN "units" ON "units".id = "lessons".units_id 
    WHERE "units".id = $1
    ORDER BY "lessons"."lessonOrder" ASC;
    `
  
    const lessonsParams = [req.params.unitId]

    const results = await pool.query(lessonsQuery, lessonsParams);

    const lessonIds = results.rows

    await Promise.all(
      lessonIds.map(async (lesson, i) => {
        const progressQuery = `
          SELECT "content"."isRequired", "users_content"."isComplete", "users_content".comment, "users_content".media FROM "content"
          JOIN "users_content" ON "users_content".content_id = "content".id
          JOIN "lessons" ON "lessons".id = "content".lessons_id
          WHERE "users_content".user_id = $1 AND "lessons".id = $2
          ORDER BY "content"."contentOrder" ASC
            `;

        const results = await pool.query(progressQuery, [
          req.params.studentId,
          lesson.lessonId,
        ]);
        progress[i] = results.rows;
      })
    );

    console.log("ROWS", progress)
    res.send(progress)
  } catch (error) {
    res.sendStatus(500);
    console.log("Error posting Cohort :", error);
  }
});


module.exports = router;
