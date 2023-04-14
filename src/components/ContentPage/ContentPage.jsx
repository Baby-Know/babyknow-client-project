import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardMedia, Typography, Breadcrumbs } from "@mui/material";

function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const contentArray = useSelector(store => store.contentReducer);
    const content = contentArray[0];

    console.log('content', content);
    // console.log('content.content', content.content);


    useEffect(() => {
        dispatch({
            type: "GET_UNIT_LESSON_CONTENT",
            payload: { unitId, lessonId, contentId }
        });
    }, []);

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/" to={`/unit/${unitId}`}>
                    Unit {unitId}
                </Link>
                <Typography color="text.primary">Lesson {lessonId}</Typography>
                <Typography color="text.primary">{content?.title}</Typography>
            </Breadcrumbs >
            <Card id='contentHeader'>
                {content ?
                    <>
                        <h1>{content.title}</h1>
                        <h2>{content.description}</h2>
                    </> :
                    <></>
                }
            </Card>
            {/* <CardMedia component="video" url={`${content.content}`}>

            </CardMedia> */}
        </>
    );

}

export default ContentPage;