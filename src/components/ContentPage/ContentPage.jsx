import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Checkbox, Typography, Breadcrumbs } from "@mui/material";
import CommentBox from "./CommentBox/CommmentBox";


function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const contentArray = useSelector(store => store.contentReducer);
    const content = contentArray[0];

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
            payload: { unitId, lessonId, contentId }
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
            </span>
            <span>
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
                        <h1>{content.contentTitle}</h1>
                        <h2>{content.contentDescription}</h2>
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
                <Card>
                    <span>{user.firstName} {user.lastName}</span>
                    <p>{userContent.comment}</p>
                </Card> :
                <></>
            }
            <CommentBox userId={userId} contentId={contentId} userContentId={userContentId} />


        </>
    );

}

export default ContentPage;