import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Checkbox, Typography, Breadcrumbs } from "@mui/material";


function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    console.log('unitId', unitId, "lessonId", lessonId, "contentId", contentId)
    const dispatch = useDispatch();
    const content = useSelector(store => store.contentReducer);

    const user = useSelector(store => store.user);
    const userId = user.id;
    const userContent = useSelector(store => store.userContentReducer);

    useEffect(() => {
        dispatch({
            type: 'GET_UNIT_LESSON_CONTENT',
            payload: { unitId: Number(unitId), lessonId: Number(lessonId), contentId: Number(contentId) }
        });
    }, []);


    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" id='breadCrumbs'>
                <Link underline="hover" color="inherit" href="/" to={`/unit/${unitId}`}>
                    <h3>{content.unitName}</h3>
                </Link>
                <Typography color="text.primary">{content?.lessonName}</Typography>
                <Typography color="text.primary">{content?.contentTitle}</Typography>
            </Breadcrumbs >
            {content?.contentIsRequired ?
                <div>
                    Check when you've finished the lesson <Checkbox
                    />
                </div> :
                <></>
            }

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
                                <h4><a href={`https://${content?.contentContent}`} target="_blank" rel="noopener noreferrer">Please follow this link to complete a survey!</a></h4>
                            </Card> :
                            <Card id='videoCard'>
                                <video width="320" height="240" controls >
                                    <source src={`${content?.contentContent}`} type="video/mp4"></source>
                                </video>
                            </Card>
            }
        </>
    );

}

export default ContentPage;