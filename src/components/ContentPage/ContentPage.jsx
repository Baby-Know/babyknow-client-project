import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Box, Button, Card, Checkbox, IconButton, TextareaAutosize, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import CommentBox from "./CommentBox/CommentBox";
import MediaUpload from './MediaUpload/MediaUpload';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";



function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    console.log('unitId', unitId, "lessonId", lessonId, "contentId", contentId);
    const dispatch = useDispatch();
    const history = useHistory();

    const content = useSelector(store => store.contentReducer);

    const user = useSelector(store => store.user);
    const userId = user.id;

    const userContent = useSelector(store => store.userContentReducer);
    const userContentId = userContent?.id;

    const isComplete = userContent?.isComplete;

    //on page load get the content title, info, video/survey and the user-specific tracker for complete, comments, media
    useEffect(() => {
        dispatch({
            type: 'GET_UNIT_LESSON_CONTENT',
            payload: { unitId: Number(unitId), lessonId: Number(lessonId), contentId: Number(contentId) }
        });
        dispatch({
            type: 'FETCH_USER_CONTENT',
            payload: { userId, contentId, userContentId }
        });
    }, [unitId, lessonId, contentId]);

    const renderCourseContent = () => {
        if (content.contentIsSurvey) {
            return (
                <Card id='surveyCard'>
                    <h4><a href={`https://${content?.contentContent}`} target="_blank" rel="noopener noreferrer">Please follow this link to complete a survey!</a></h4>
                </Card>
            )
        } else if (content.contentContent) {
            return (
                <Card id='videoCard'>
                    <video width="400" height="300" controls >
                        <source src={`${content?.contentContent}`} type="video/mp4"></source>
                    </video>
                </Card>
            )
        } else {
            return (
                <p>LOADING</p>
            );
        }
    };

    const renderUserMedia = () => {
        if (userContent.media) {
            return (
                <Card id='videoCard'>
                    <h2>Your uploaded media</h2>
                    <video width="400" height="300" controls >
                        <source src={`${userContent?.media}`} type="video/mp4"></source>
                    </video>
                </Card>
            )
        } else {
            return (
                <></>
            )
        }
    }

    //toggle the isComplete column in users_content table with the checkmark
    const toggleComplete = (bool) => {
        dispatch({
            type: 'TOGGLE_COMPLETE',
            payload: { userContentId, bool, userId, contentId }
        });
    };
    console.log('userContent', userContent.id);

    //handling the checkbox toggling
    const [isCompleteControl, setIsCompleteControl] = useState(isComplete);

    const handleCompleteToggle = (event) => {
        setIsCompleteControl(event.target.isCompleteControl);
    };

    //Edit comment
    const [commentToEdit, setCommentToEdit] = useState({ id: -1, comment: '' });

    const editComment = (commentToEdit) => {
        let newComment = commentToEdit.comment;
        dispatch({
            type: 'POST_COMMENT',
            payload: { userContentId, newComment, userId, contentId }
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
                    <Link underline="hover" color="inherit" href="/" to={`/unit/${unitId}/${userId}`}>
                        <h3>{content?.unitName}</h3>
                    </Link>
                    <Typography color="text.primary">{content?.lessonName}</Typography>
                    <Typography color="text.primary">{content?.contentTitle}</Typography>
                </Breadcrumbs >

                {content?.contentIsRequired ?

                    <Typography style={{ float: "right", paddingLeft: "2%" }}>
                        Check the box when you've finished the lesson! <Checkbox checked={isComplete ? true : false}
                            onClick={() => toggleComplete(!isComplete)} onChange={handleCompleteToggle}
                        />
                    </Typography> :
                    <></>
                }
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Card id='contentHeader'>
                {content ?
                    <>
                        <h1>{content?.contentTitle}</h1>
                        <h2>{content?.contentDescription}</h2>
                    </> :
                    <></>
                }
            </Card>

            {/* function determines which kind of content to display - either survey or video */}
            {renderCourseContent()}
            

            <Box sx={{
                display: 'grid',
                justifyContent: "center",
                alignItems: "center",
                margin: 'auto',
                width: '50%',
                height: '100%'
            }}>

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

            </Box>

            <Box sx={{
                display: 'grid',
                justifyContent: "center",
                alignItems: "center",
                margin: 'auto',
                width: '50%',
                height: '100%'
            }}>
                {!content.isSurvey ? <MediaUpload userId={userId} contentId={contentId} userContentId={userContentId} /> : <></>}

                {/* function to render the student's upload */}
                {renderUserMedia()}

            </Box>
            </div>

            <Button type="button"
                className="btn btn_asLink"
                onClick={() => history.push(`/unit/${unitId}`)}>
                <Typography variant="body1">Back</Typography>
            </Button>
        </>
    );

}

export default ContentPage;