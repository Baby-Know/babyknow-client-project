import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Button, Card, Checkbox, IconButton, TextareaAutosize, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import CommentBox from "./CommentBox/CommmentBox";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    console.log('unitId', unitId, "lessonId", lessonId, "contentId", contentId);
    const dispatch = useDispatch();
    const content = useSelector(store => store.contentReducer);

    const user = useSelector(store => store.user);
    const userId = user.id;

    const userContentreducer = useSelector(store => store.userContentReducer);
    const userContent = userContentreducer[0];
    const userContentId = userContent?.id;
    const isComplete = userContent?.isComplete;

    console.log('content', content);

    //on page load get the content title, info, video/survey and the user-specific tracker for complete, comments, media
    useEffect(() => {
        dispatch({
            type: 'GET_UNIT_LESSON_CONTENT',
            payload: { unitId: Number(unitId), lessonId: Number(lessonId), contentId: Number(contentId) }
        });
        console.log('Fetch params contentpage', userId, contentId);
        dispatch({
            type: 'FETCH_USER_CONTENT',
            payload: { userId, contentId }
        });
    }, []);

    //toggle the isComplete column in users_content table with the checkmark
    const toggleComplete = (bool) => {
        console.log(bool);
        dispatch({
            type: 'TOGGLE_COMPLETE',
            payload: { userContentId, bool, userId, contentId }
        });
    };
    console.log('userContent', userContent);

    //handling the checkbox toggling
    const [isCompleteControl, setIsCompleteControl] = useState(isComplete);

    const handleCompleteToggle = (event) => {
        setIsCompleteControl(event.target.isCompleteControl);
    };

    //Edit comment
    const [commentToEdit, setCommentToEdit] = useState({ id: -1, comment: '' });

    const editComment = (commentToEdit) => {
        let comment = commentToEdit.comment;
        console.log('comment', comment);
        dispatch({
            type: 'POST_COMMENT',
            payload: { comment, userId, contentId }
        });
        setCommentToEdit({ id: -1, comment: '' });
    };

    const deleteComment = () => {
        const swal = withReactContent(Swal);
        Swal.fire({
            title: "Are you sure you want to delete your comment?",
            text: "Your comment will be deleted and lost forever.",
            confirmButtonText: "Delete",
            confirmButtonColor: "#D21304",
            cancelButtonColor: "#263549",
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'DELETE_STUDENT_COMMENT',
                    payload: { userContentId, userId, contentId }
                });
            }
        });
    };

    const cancelEdit = () => {
        setCommentToEdit({ id: -1, comment: '' });
    };


    return (
        <>
            <span>
                <Breadcrumbs aria-label="breadcrumb" id='breadCrumbs'>
                    <Link underline="hover" color="inherit" href="/" to={`/unit/${unitId}`}>
                        <h3>{content?.unitName}</h3>
                    </Link>
                    <Typography color="text.primary">{content?.lessonName}</Typography>
                    <Typography color="text.primary">{content?.contentTitle}</Typography>
                </Breadcrumbs >

                {content?.contentIsRequired ?

                    <Typography>
                        Check the box when you've finished the lesson! <Checkbox checked={isComplete ? true : false}
                            onClick={() => toggleComplete(!isComplete)} onChange={handleCompleteToggle}
                        />
                    </Typography> :
                    <></>
                }
            </span>

            <Card id='contentHeader'>
                {content ?
                    <>
                        <h1>{content?.contentTitle}</h1>
                        <h2>{content?.contentDescription}</h2>
                    </> :
                    <></>
                }
            </Card>
            {content?.contentIsSurvey ?
                <Card id='surveyCard'>
                    <h4><a href={`https://${content.contentContent}`}>Please follow this link to complete a survey!</a></h4>
                </Card> :
                <Card id='videoCard'>
                    <video width="320" height="240" controls >
                        <source src={`${content?.contentContent}`} type="video/*"></source>
                    </video>
                </Card>
            }
            <h2 style={{ paddingLeft: "2%" }}>Student Comments and Media Upload</h2>

            {userContent?.comment ?
                <Card id="renderCommentCard">
                    {userContentId !== commentToEdit.id ?
                        <>

                            <span>{user.firstName} {user.lastName}</span>
                            <p>{userContent.comment}</p>
                        </> :
                        <>
                            <TextareaAutosize
                                id="textFieldInput"
                                minRows={3}
                                style={{ width: 400 }}
                                value={commentToEdit.comment}
                                placeholder='Enter any questions or comments here!'
                                onChange={(event) => setCommentToEdit({ ...commentToEdit, comment: event.target.value })}>
                            </TextareaAutosize>
                        </>
                    }
                    {userContentId !== commentToEdit.id ?
                        <>
                            <Button sx={{ backgroundColor: 'teal' }}
                                className="studentCommentButton"
                                onClick={() => setCommentToEdit({ id: userContentId, comment: userContent.comment })}
                            >Edit</Button>
                            <Button sx={{ backgroundColor: 'orange' }} className="studentCommentButton" onClick={() => {
                                deleteComment();
                            }}>Delete</Button>
                        </> :
                        <>
                            <IconButton onClick={() => editComment(commentToEdit)}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton onClick={cancelEdit} >
                                <ClearIcon />
                            </IconButton>
                        </>

                    }

                </Card> :


                <CommentBox userId={userId} contentId={contentId} userContentId={userContentId} />
            }
        </>
    );

}

export default ContentPage;