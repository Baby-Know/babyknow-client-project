const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");

//GET all cohorts
router.get("/", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
    SELECT * FROM "cohorts"
    `;

    const cohortsResponse = await pool.query(queryText);
    const cohorts = cohortsResponse.rows;

    res.send(cohorts);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error getting all Cohorts :", error);
  }
});

//POST new cohort
router.post("/", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const query = `
    INSERT INTO "cohorts" ("name")
    VALUES ($1)`;

    await pool.query(query, [req.body.cohort]);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error posting Cohort :", error);
  }
});

router.delete(
  "/:id",
  rejectUnauthenticated,
  rejectNonAdmin,
  async (req, res) => {
    const connection = await pool.connect();

    try {
      await connection.query("BEGIN");
      //First we have to find everyone in this cohort and swap them to
      //Baby Know
      const usersCohortsQueryText = `
      UPDATE "users_cohorts"
      SET "cohorts_id" = 1
      WHERE "cohorts_id" = $1
      `;

      await connection.query(usersCohortsQueryText, [req.params.id]);

      const cohortsQueryText = `
      DELETE FROM "cohorts"
      WHERE "id" = $1
      `;

      await connection.query(cohortsQueryText, [req.params.id]);
      res.sendStatus(204);
      await connection.query("COMMIT");
    } catch (error) {
      res.sendStatus(500);
      console.log("Error deleting Cohort :", error);
    } finally {
      connection.release();
    }
  }
);

module.exports = router;
