const express = require("express");
const pool = require("../modules/pool");
const io = require("socket.io")
const router = express.Router();
const {rejectUnauthenticated} = require("../modules/authentication-middleware");
const { rejectNonAdmin } = require("../modules/admin-middleware");


//posting room name to establish room connection in socket.io
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        await connect.query('BEGIN')
        const sqlText =  `
        INSERT INTO "room" ("roomName", "user_id_1", "user_id_2)
        VALUES ($1, $2, $3)
        `
        const sqlParams = [
            req.body.roomName, req.body.user_id_1, req.body.user_id_2
        ]
        await connect.query(sqlText, sqlParams)
       
    } catch (error) {
        console.error('error posting room', error)
    }
})


// posting messages in a room
router.post('/', rejectUnauthenticated, async (req, res) => {
    const connect = await pool.connect()
    try {
        await connect.query('BEGIN')
        const sqlText =  `
        INSERT INTO "messages" ("room_id", "messageText")
        VALUES ($1, $2)
        `
        const sqlParams = [
            req.body
        ]
        // emitting req.body text after it comes back from the db
        // whatever the emit listener is, put it on client dispatch
        // req.io.to(anotherSocketId).emit("private_message")
    } catch (error) {
        console.error('error posting message', error)
    }
})






module.exports = router;
