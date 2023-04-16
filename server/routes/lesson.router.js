const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const { rejectNonAdmin } = require("../modules/admin-middleware");


  //POST new lesson
router.post("/:units_id", rejectUnauthenticated, rejectNonAdmin, async (req, res) => {

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

//DELETE lesson
router.delete(
  '/:id',
  rejectUnauthenticated,
  rejectNonAdmin,
  async (req, res) => {
    try {
      const query = `
      DELETE FROM "lessons"
      WHERE "lessons".id = $1;`;

      params = [req.params.id];

      await pool.query(query, params);
      res.sendStatus(200);
    } catch (error) {
      console.log('Error deleting lesson :', error);
      res.sendStatus(500);
    }
  }
);

router.put('/:id', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
    UPDATE "lessons"
    SET "name" = $1, "description" = $2
    WHERE "lessons".id = $3;
    `;

    const params = [req.body.lessonName, req.body.lessonDescription, req.body.id]

    await pool.query(queryText, params);

    res.sendStatus(200);
  } catch (error) {
    console.log('Error editing unit :', error);
  }
});

router.put('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
    UPDATE "lessons"
    SET "lessonOrder" = $1
    WHERE "lessons".id = $2;
    `;

    const params = [req.body.order, req.body.lessonId]

    await pool.query(queryText, params);

    res.sendStatus(200);
  } catch (error) {
    console.log('Error swapping lessons :', error);
  }
});


module.exports = router;