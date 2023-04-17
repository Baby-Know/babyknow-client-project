import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Checkbox, Typography, Breadcrumbs } from "@mui/material";


function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const contentArray = useSelector(store => store.contentReducer);
    const content = contentArray[0];

    const user = useSelector(store => store.user);
    const userId = user.id;
    const userContent = useSelector(store => store.userContentReducer);

    console.log('content', content);
    console.log('content.contentContent', content?.contentContent);

    useEffect(() => {
        dispatch({
            type: 'GET_UNIT_LESSON_CONTENT',
            payload: { unitId, lessonId, contentId }
        });
        // console.log('Fetch params contentpage', userId, contentId);
        // dispatch({
        //     type: 'FETCH_USER_CONTENT',
        //     payload: { userId, contentId }
        // });
    }, []);

    // const loadUserContentReducer = () => {
    //     console.log('Fetch params contentpage', userId, contentId);
    //     dispatch({
    //         type: 'FETCH_USER_CONTENT',
    //         payload: { userId, contentId }
    //     });
    // };

    const toggleComplete = (boolean) => {
        console.log(boolean);
        dispatch({
            type: 'TOGGLE_COMPLETE',
            payload: { boolean }
        });
    };
    console.log('userContent', userContent);

    return (
        <>
            {/* <div onClick={() => loadUserContentReducer()}> */}

            <Breadcrumbs aria-label="breadcrumb" id='breadCrumbs'>
                <Link underline="hover" color="inherit" href="/" to={`/unit/${unitId}`}>
                    <h3>{content?.unitName}</h3>
                </Link>
                <Typography color="text.primary">{content?.lessonName}</Typography>
                <Typography color="text.primary">{content?.contentTitle}</Typography>
            </Breadcrumbs >
            {content?.contentIsRequired ?
                <div>
                    Check when you've finished the lesson <Checkbox onClick={() => toggleComplete(!content.contentIsRequired)} />
                </div> :
                <></>
            }

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
                        <source src={`${content?.contentContent}`} type="video/mp4"></source>
                    </video>
                </Card>
            }
            {/* </div> */}
        </>
    );

}

export default ContentPage;