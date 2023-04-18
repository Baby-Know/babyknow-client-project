import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useDynamicHeightField from "./useDynamicHeightField";
import './commentBox.css';

const INITIAL_HEIGHT = 46;

const CommentBox = ({ userId, contentId }) => {
    const user = useSelector((store) => store.user);

    const [isExpanded, setIsExpanded] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    const onExpand = () => {
        if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
    };

    const onChange = (e) => {
        setCommentValue(e.target.value);
    };

    const onClose = () => {
        setCommentValue("");
        setIsExpanded(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('send the form data somewhere');
        dispatch({
            type: 'POST_COMMENT',
            payload: { userContentId, newComment, userId, contentId }
        });
    };

    useDynamicHeightField(textRef, commentValue);

    return (
        <form
            onSubmit={onSubmit}
            ref={containerRef}
            className={("comment-box", {
                expanded: isExpanded,
                collapsed: !isExpanded,
                modified: commentValue.length > 0,
            })}
            style={{
                minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
            }}
        >
            <div className="header">
                <div className="user">
                    <span>{user.firstName} {user.lastName}</span>
                </div>
            </div>
            <textarea
                ref={textRef}
                onClick={onExpand}
                onFocus={onExpand}
                onChange={onChange}
                className="comment-field"
                placeholder="What are your thoughts?"
                value={commentValue}
                name="comment"
                id="comment"
            />
            <div className="actions">
                <button type="button" className="cancel" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" disabled={commentValue.length < 1}>
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CommentBox;;