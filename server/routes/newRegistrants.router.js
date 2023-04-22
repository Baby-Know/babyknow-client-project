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
    SELECT 
    	"email", "id", "firstName", "lastName", "access", "organization"
     FROM "users" WHERE "access" = 0;
    `;
    const response = await pool.query(queryText);

    res.send(response.rows);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error getting new registrants :", error);
  }
});

//UPDATE NEW USER
router.put("/:id", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");
    const usersQueryText = `
    UPDATE "users" 
    SET "email" = $1, "firstName" = $2, "lastName" = $3, "access" = $4, "organization" = $5
    WHERE id = $6;
    `;
    await connection.query(usersQueryText, [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      req.body.access,
      req.body.organization,
      req.params.id,
    ]);

    if (req.body.access > 0) {
      const usersCohortsQueryText = `
      INSERT INTO "users_cohorts" ("cohorts_id", "user_id")
      VALUES ($1, $2)
    `;

      //All new registrants default to BabyKnow
      await connection.query(usersCohortsQueryText, [1, req.params.id]);
    }
    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    res.sendStatus(500);
    console.log("Error updating new registrant :", error);
  } finally {
    connection.release();
  }
});

//DELETE NEW USER
router.delete(
  "/:id",
  rejectUnauthenticated,
  rejectNonAdmin,
  async (req, res) => {
    try {
      const query = `
      DELETE FROM "users"
      WHERE "users".id = $1;`;

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
