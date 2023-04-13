const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { rejectNonAdmin } = require("../modules/admin-middleware");

router.post('/', rejectUnauthenticated, rejectNonAdmin, async (req, res) => {
    // connect 
    try {
        const contentSqlQuery = `
        INSERT INTO "content" ("content", "title", "description", "isSurvey", "isRequired")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING "id";
        `
        const params = [req.body.contentToSend.content, req.body.contentToSend.title, req.body.contentToSend.description, req.body.contentToSend.isSurvey, req.body.contentToSend.isRequired]
        
        //RETURNING 'id' will give us back the id of the created content
        result = await pool.query(contentSqlQuery, params)
        createdContentId = result.rows[0].id 

        console.log("createdcontentID", createdContentId)

        const lessonsContentSqlQuery = `
        INSERT INTO "lessons_content" ("content_id", "lessons_id", "contentOrder")
        VALUES ($1, $2, $3)
        `
        pool.query(lessonsContentSqlQuery, [createdContentId, req.body.selectedId, req.body.contentToSend.contentOrder])
        res.sendStatus(200)
    } catch (error) {
        console.error('error posting content', error)
        res.sendStatus(500);
    }
})

//GET content
router.get('/:id', rejectUnauthenticated, async (req, res) => {
    try {
      const queryText = `
        SELECT * FROM "content"
        WHERE "content".id = $1;
      `;
      const params = [ req.params.id ]  
      const unitResult = await pool.query( queryText, params )
      content = unitResult.rows;
      console.log('THIS IS CONTENT', content)
      res.send(content);
    } catch (error) {
      res.sendStatus(500);
      console.log('Error getting content:', error);
    }
  });


module.exports = router;