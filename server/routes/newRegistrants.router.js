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
     FROM "users" WHERE "users".access = 0;
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
  try {
    const queryText = `
    UPDATE "users" 
    SET "email" = $1, "firstName" = $2, "lastName" = $3, "access" = $4, "organization" = $5
    WHERE id = $6;
    `;
    await pool.query(queryText, [
      req.body.email,
      req.body.firstName,
      req.body.lastName,
      req.body.access,
      req.body.organization,
      req.params.id,
    ]);
  } catch (error) {
    res.sendStatus(500);
    console.log("Error updating new registrant :", error);
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
