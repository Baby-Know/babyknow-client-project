import { useEffect } from "react";
import { useParams, Link,  useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Checkbox, Button, Typography, Breadcrumbs } from "@mui/material";


function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const content = useSelector(store => store.contentReducer);


    const user = useSelector(store => store.user);
    const userId = user.id;
    const userContent = useSelector(store => store.userContentReducer);

    useEffect(() => {
        dispatch({
            type: 'GET_UNIT_LESSON_CONTENT',
            payload: { unitId: Number(unitId), lessonId: Number(lessonId), contentId: Number(contentId) }
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
            )
        }


    }
    
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
            {renderCourseContent()}

            <Button type="button"
            className="btn btn_asLink"
            onClick={() => history.push(`/unit/${unitId}`)}>
                <Typography variant="body1">Back</Typography>
            </Button>
        </>
    );

}

export default ContentPage;