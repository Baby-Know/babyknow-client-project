const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {rejectUnauthenticated} = require("../modules/authentication-middleware");
const { rejectNonAdmin } = require("../modules/admin-middleware");
const { s3Upload } = require('../s3Service');
const aws = require('aws-sdk');

const secretAccessKey = process.env.AWS_ACCESS_SECRET
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const region = process.env.AWS_REGION

const s3 = new aws.S3({
    region,
    secretAccessKey,
    accessKeyId
});

/** ---------- Multer | S3 ---------- **/
const multer = require('multer');
require('dotenv').config();
const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'video') {
        cb(null, true)
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}

const upload = multer({ storage, fileFilter });

// get video upload by content id
router.get('/:id', async (req, res) => {
    const contentId = req.params.userId;
    const sqlValue = [contentId]
    const sqlText = `
    SELECT "content" from "content" 
    WHERE "id" = $1;`;
    pool.query(sqlText, sqlValue)
    .then((result ) => {
        res.send(result.rows)
    })
    .catch(err => {
        console.log('error getting video upload from content', err)
    })
})

// uploading files into AWS
router.put('/files', rejectUnauthenticated, rejectNonAdmin, upload.single('file'), async (req, res) => {
    console.log('req.file', req.file)
    console.log('req.body.Location', req.body.Location);
    try {
        const results = await s3Upload(req.file);
        console.log('AWS S3 upload success');
        const sqlText = `UPDATE "content" 
        SET "content" = $1 
        WHERE id = $2`
        pool.query(sqlText, [results.Location, req.body.id]) 
    } catch (err) {
        res.sendStatus(500);
        console.log('AWS S3 upload fail', err);
    }
});


// posting content from content form
router.post('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    console.log('req.body', req.body)
    try {
        const contentSqlQuery = `
        INSERT INTO "content" ("content", "title", "description", "isSurvey", "isRequired")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
        `
        //RETURNING 'id' will give us back the id of the created content
        result = await pool.query(contentSqlQuery, [req.body.contentToSend.content, req.body.contentToSend.title, req.body.contentToSend.description, req.body.contentToSend.isSurvey, req.body.contentToSend.isRequired])
        createdContentId = result.rows[0].id 

        console.log("createdcontentID", createdContentId)

        const lessonsContentSqlQuery = `
        INSERT INTO "lessons_content" ("content_id", "lessons_id", "contentOrder")
        VALUES ($1, $2, $3)
        `
        pool.query(lessonsContentSqlQuery, [createdContentId, req.body.contentOrder.lessons_id, req.body.contentOrder.contentOrder])
        res.sendStatus(200)
    } catch (error) {
        console.error('error posting content', error)
        res.sendStatus(500);
    }
})


module.exports = router;