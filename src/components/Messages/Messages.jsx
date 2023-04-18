// import {ChatEngine, getOrCreateChat} from 'react-chat-engine';
import { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";


function Messages() {
    const PORT = process.env.PORT || 5000;
    const socket = io.connect(`http://localhost:${PORT}`)
    const uuid = require('uuid').v4
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [room, setRoom] = useState([]);
    const newRoomName = uuid();

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`You connected with socket id: ${socket.id}`)
        })

            const receiveMessage = () => {
                dispatch({ type: 'GET_MESSAGE' });
            }
            // event listener to receive message back from database
            socket.on("send_message", receiveMessage);

            const newRoom = (room) =>  {
                room.push(newRoomName)
            }

            socket.emit('join_room', setRoom(newRoom(room)));
            console.log('room id', room)

            // turn off socket to prevent duplicates
            return () => {
                socket.off("send_message", receiveMessage)
            }

        }, [])
    
    const submitMessage = (e) => {
        e.preventDefault();
        dispatch({ type: 'POST_MESSAGE', payload: message })
        setMessage('');
    }

    return (
        <>
            <h1>CHAT!</h1>
            {/* {chat.map((message, i) => {
                return (
                    <p key={i}>{message.message}</p>
                )
            })} */}

            {/* start messaging, get Room id */}

            <form onSubmit={submitMessage}>
                <input type='text' name='chat'
                    placeholder='Send text'
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }} />
                <button type='submit'>Submit</button>
            </form>
        </>
    )

}

export default Messages;

