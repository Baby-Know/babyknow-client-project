import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, TextareaAutosize } from "@mui/material";


const CommentBox = ({ userId, contentId, userContentId }) => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState('');

    //Submit student comment
    const submitComment = () => {
        console.log(newComment);
        dispatch({
            type: 'POST_COMMENT',
            payload: { userContentId, newComment, userId, contentId }
        });
    };

    return (
        <div>
            <Card id="textFieldCard">

                <TextareaAutosize
                    id="textFieldInput"
                    minRows={3}
                    style={{ width: 400 }}
                    value={newComment}
                    placeholder='Enter any questions or comments here!'
                    onChange={(event) => setNewComment(event.target.value)}>
                </TextareaAutosize>
                <div>
                    <Button sx={{ backgroundColor: 'teal' }} className="studentCommentButton" onClick={() => {
                        console.log(newComment, userId, contentId);
                        dispatch({
                            type: 'POST_COMMENT',
                            payload: userContentId, newComment, userId, contentId
                        });
                    }}> Submit</Button>
                    <Button sx={{ backgroundColor: 'orange' }} className="studentCommentButton">Cancel</Button>
                </div>
            </Card >
        </div >
    );
};

export default CommentBox;