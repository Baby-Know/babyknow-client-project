const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-middleware');
const { s3Upload } = require('../s3Service');
const aws = require('aws-sdk');

//POST user content ids
router.post('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  console.log('req.body', req.body);
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
