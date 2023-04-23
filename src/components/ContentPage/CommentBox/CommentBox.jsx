import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, TextareaAutosize } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const CommentBox = ({ userId, contentId, userContentId }) => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [newComment, setNewComment] = useState('');

    //Submit student comment
    const submitComment = () => {
        dispatch({
            type: 'POST_COMMENT',
            payload: { userContentId, newComment, userId, contentId }
        });
        setNewComment('');
    };

    const handleCancel = () => {
        const swal = withReactContent(Swal);
        Swal.fire({
            title: "Are you sure you want to cancel your comment?",
            text: "Your comment will be deleted and lost forever.",
            confirmButtonText: "Delete",
            confirmButtonColor: "#D21304",
            cancelButtonColor: "#263549",
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setNewComment('');
            }
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
                    <Button sx={{ backgroundColor: 'white', marginLeft: '8px' }} className="studentCommentButton" disabled={newComment.length < 1}
                        onClick={() => {
                            submitComment();
                        }}> Submit</Button>
                    <Button sx={{ backgroundColor: '#276184', color: 'white' }} className="studentCommentButton" onClick={() => {
                        handleCancel();
                    }}>Cancel</Button>
                </div>
            </Card >
        </div >
    );
};

export default CommentBox;