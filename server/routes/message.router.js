const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {rejectUnauthenticated} = require("../modules/authentication-middleware");
const { rejectNonAdmin } = require("../modules/admin-middleware");

//posting room name to establish room connection in socket.io
router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        const sqlText =  `
        INSERT INTO "room" ("roomName", "user_id_1", "user_id_2)
        VALUES ($1, $2, $3)
        `
        const newRoomName = nanoid();
        const sqlParams = [newRoomName, req.body.user_id_1, req.body.user_id_2]
        pool.query(sqlText, sqlParams)
        .then(() => {
            const roomIdSqlText = `SELECT currval('room_id_seq)`
        pool.query(roomIdSqlText).then((response) => {
            const newRoomId = response.rows[0].currval;
            const roomToSend = {
                id: newRoomId,
                user_id_1: user_id_1,
                user_id_2: user_id_2
            }
            //socket emit with roomName
            console.log('emitting room, room is', roomToSend)
            req.io.emit("updateRooms", roomToSend)
            res.sendStatus(204)
        })
    });
    } catch (error) {
        console.error('error posting room', error)
        res.sendStatus(500);
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
