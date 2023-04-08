const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', async (req, res) => {

   console.log("REQQQQQQ", req.body)

   try {
    const query = `
    INSERT INTO "cohorts" ("name")
    VALUES ($1)`

   //  const params = [ req.body.cohort ]
  
    await pool.query(query, [ req.body.cohort ])

    res.sendStatus(201)
   } catch (error) {
    res.sendStatus(500);
    console.log("Error posting Cohort :", error)
   }
});

module.exports = router;