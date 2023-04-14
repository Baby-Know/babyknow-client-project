import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography, Breadcrumbs } from "@mui/material";

function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const contentArray = useSelector(store => store.contentReducer);
    const content = contentArray[0];

    console.log('content', content);

    useEffect(() => {
        dispatch({
            type: "GET_CONTENT",
            payload: contentId
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
        </>
    );

}

export default ContentPage;