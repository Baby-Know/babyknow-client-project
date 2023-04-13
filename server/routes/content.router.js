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
const bucket = process.env.BUCKET_NAME

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
    console.log('content router get by id', req.params);
    const contentId = req.params.contentId;
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


// posting content from content form
router.post('/', rejectUnauthenticated, rejectNonAdmin, upload.single('file'), async (req, res) => {
    console.log('req.body', req.body)
    console.log('req.file', req.file)

    const connect = await pool.connect()  
    try {
        await connect.query('BEGIN');
        const results = await s3Upload(req.file);
        console.log('AWS S3 upload success');
        console.log('results', results)

        const contentSqlQuery =  `
        INSERT INTO "content" ("content", "title", "description", "isSurvey", "isRequired")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
        `
        //RETURNING 'id' will give us back the id of the created content
        const result = await connect.query(contentSqlQuery, [results.Location, req.body.title, req.body.description, req.body.isSurvey, req.body.isRequired])
        createdContentId = result.rows[0].id 

        console.log("createdcontentID", createdContentId)

        const lessonsContentSqlQuery = `
        INSERT INTO "lessons_content" ("content_id", "lessons_id", "contentOrder")
        VALUES ($1, $2, $3)
        `
        connect.query(lessonsContentSqlQuery, [createdContentId, req.body.contentOrder.lessons_id, req.body.contentOrder.contentOrder])
        Promise.all()
        await connect.query('COMMIT')
        res.sendStatus(200)
    } catch (error) {
        await connect.query('ROLLBACK')
        console.error('error posting content', error)
        res.sendStatus(500);
    } finally {
        connect.release();
    }
})


module.exports = router;