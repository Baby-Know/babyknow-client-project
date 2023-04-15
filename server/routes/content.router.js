const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { rejectNonAdmin } = require('../modules/admin-middleware');
const { s3Upload } = require('../s3Service');
const aws = require('aws-sdk');

const secretAccessKey = process.env.AWS_ACCESS_SECRET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const region = process.env.AWS_REGION;
const bucket = process.env.BUCKET_NAME;

const s3 = new aws.S3({
  region,
  secretAccessKey,
  accessKeyId,
});

/** ---------- Multer | S3 ---------- **/
const multer = require('multer');
require('dotenv').config();
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'video') {
    cb(null, true);
  } else {
    cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
  }
};
const upload = multer({ storage, fileFilter });

// get video upload by content id
router.get('/:id', async (req, res) => {
  const contentId = req.params.contentId;
  const sqlValue = [contentId];
  const sqlText = `
    SELECT "content" from "content" 
    WHERE "id" = $1;`;
  pool
    .query(sqlText, sqlValue)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('error getting video upload from content', err);
    });
});

// uploading files into AWS
// router.put('/files', rejectUnauthenticated, rejectNonAdmin, upload.single('file'), async (req, res) => {
//     console.log('req.file', req.file)
//     console.log('req.body', req.body)
//     console.log('req.body.Location', req.body.Location)
//     try {
//         const results = await s3Upload(req.file);
//         console.log('AWS S3 upload success');
//         const sqlText = `UPDATE "content"
//         SET "content" = $1
//         WHERE id = $2`
//         pool.query(sqlText, [results.Location, req.body.id])
//     } catch (err) {
//         res.sendStatus(500);
//         console.log('AWS S3 upload fail', err);
//     }
// });

async function awsQuery(req, res) {}

// posting content from content form
router.post('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  const connect = await pool.connect();
  try {
    await connect.query('BEGIN');
    const contentSqlQuery = `
        INSERT INTO "content" ("content", "title", "description", "isSurvey", "isRequired")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
        `;
    //RETURNING 'id' will give us back the id of the created content
    const result = await connect.query(contentSqlQuery, [
      req.body.contentToSend.content,
      req.body.contentToSend.title,
      req.body.contentToSend.description,
      req.body.contentToSend.isSurvey,
      req.body.contentToSend.isRequired,
    ]);
    createdContentId = result.rows[0].id;

    //RETURNING 'id' will give us back the id of the created content
    result = await pool.query(contentSqlQuery, params);
    createdContentId = result.rows[0].id;

    console.log('createdcontentID', createdContentId);

    const lessonsContentSqlQuery = `
        INSERT INTO "lessons_content" ("content_id", "lessons_id", "contentOrder")
        VALUES ($1, $2, $3)
        `;
    connect.query(lessonsContentSqlQuery, [
      createdContentId,
      req.body.selectedId,
      req.body.contentToSend.contentOrder,
    ]);
    await connect.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    await connect.query('ROLLBACK');
    console.error('error posting content', error);
    res.sendStatus(500);
  }
});

router.post(
  '/file',
  rejectUnauthenticated,
  rejectNonAdmin,
  upload.single('file'),
  async (req, res) => {
    console.log('req.body', req.body);
    console.log('req.file', req.file);

    const connect = await pool.connect();
    try {
      await connect.query('BEGIN');
      const results = await s3Upload(req.file);
      console.log('AWS S3 upload success');
      console.log('results', results);

      const contentSqlQuery = `
        INSERT INTO "content" ("content", "title", "description", "isSurvey", "isRequired")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
        `;
      //RETURNING 'id' will give us back the id of the created content
      const result = await connect.query(contentSqlQuery, [
        results.Location,
        req.body.title,
        req.body.description,
        req.body.isSurvey,
        req.body.isRequired,
      ]);
      createdContentId = result.rows[0].id;

      console.log('createdcontentID', createdContentId);

      const lessonsContentSqlQuery = `
        INSERT INTO "lessons_content" ("content_id", "lessons_id", "contentOrder")
        VALUES ($1, $2, $3)
        `;
      connect.query(lessonsContentSqlQuery, [
        createdContentId,
        req.body.lessons_id,
        req.body.contentOrder,
      ]);
      await connect.query('COMMIT');
      res.sendStatus(200);
    } catch (error) {
      await connect.query('ROLLBACK');
      console.error('error posting content', error);
      res.sendStatus(500);
    }
  }
);

//GET content
router.get(
  '/:unitId/:lessonId/:contentId',
  rejectUnauthenticated,
  async (req, res) => {
    try {
      const queryText = `
      SELECT "units".id AS "unitId", "units".name AS "unitName", 
      "lessons".id AS "lessonId", "lessons".name AS "lessonName",
      "content".id AS "contentId", "content".content AS "contentContent", "content".title AS "contentTitle", "content".description AS "contentDescription", "content"."isRequired" AS "contentIsRequired", "content"."isSurvey" AS "contentIsSurvey"
      FROM "units", "lessons", "content"
    WHERE "units".id = $1 AND "lessons".id = $2 AND "content".id = $3;
      `;
      const params = [
        req.params.unitId,
        req.params.lessonId,
        req.params.contentId,
      ];
      const unitResult = await pool.query(queryText, params);
      content = unitResult.rows;
      res.send(content);
    } catch (error) {
      res.sendStatus(500);
      console.log('Error getting content:', error);
    }
  }
);

//DELETE content
router.delete(
  '/:contentId',
  rejectUnauthenticated,
  rejectNonAdmin,
  async (req, res) => {
    try {
      const query = `
        DELETE FROM "content"
        WHERE "content".id = $1
        `;

      params = [req.params.contentId];

      await pool.query(query, params);
      res.sendStatus(200);
    } catch (error) {
      console.log('Error deleting lesson :', error);
      res.sendStatus(500);
    }
  }
);

router.put('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
  console.log(req.body, 'reqqqq');
  try {
    const queryText = `
      UPDATE "content"
      SET "title" = $1, "description" = $2
      WHERE "content".id = $3;
      `;

    const params = [
      req.body.contentName,
      req.body.contentDescription,
      req.body.id,
    ];

    await pool.query(queryText, params);

    res.sendStatus(200);
  } catch (error) {
    console.log('Error editing unit :', error);
  }
});

module.exports = router;
