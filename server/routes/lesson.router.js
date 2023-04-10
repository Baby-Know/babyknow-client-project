const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");


  //POST new lesson
router.post("/:units_id", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    console.log('lesson to learn', req.body.lessonToSend)


    try {
      const queryText = `
      INSERT INTO "lessons" ("name", "description", "lessonOrder", "units_id")
      VALUES($1, $2, $3, $4)
      `;
      const params = [req.body.name, req.body.description, req.body.lessonOrder, req.params.units_id]

      await pool.query(queryText, params);
  
      res.sendStatus(201);
    } catch (error) {
      res.sendStatus(500);
      console.log("Error posting unit :", error);
    }
  });

module.exports = router;