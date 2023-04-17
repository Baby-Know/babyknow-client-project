const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-middleware');
const { s3Upload } = require('../s3Service');
const aws = require('aws-sdk');

//GET user-content table info
router.get('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
    SELECT * FROM "users_content" WHERE "user_id" = $1 AND "content_id" = $2;
    `;
    const queryParams = [req.body.userId, req.body.contentId];
    const queryResult = await pool.query(queryText, queryParams);
    userContent = queryResult.rows;
    res.send(userContent);
  } catch (error) {
    res.sendStatus(500);
    console.log('Error getting user-content:', error);
  }
});

//POST user content ids
router.post('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  try {
    const queryText = `
      INSERT INTO "users_content" ("user_id", "content_id", "isComplete", "media", "comment")
      VALUES($1, $2, $3, $4, $5)
      `;
    const params = [
      req.body.userContent.userId,
      req.body.userContent.contentId,
      req.body.userContent.isComplete,
      req.body.userContent.media,
      req.body.userContent.comment,
    ];

    await pool.query(queryText, params);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
    console.log('Error posting user-content relation', error);
  }
});

module.exports = router;
