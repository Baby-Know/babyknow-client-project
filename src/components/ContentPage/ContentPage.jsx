import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardMedia, Typography, Breadcrumbs } from "@mui/material";
import { Player } from 'video-react';

function ContentPage() {
    const { unitId, lessonId, contentId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const contentArray = useSelector(store => store.contentReducer);
    const content = contentArray[0];

    console.log('content', content);
    console.log('content.contentContent', content?.contentContent);

    console.log('content', content);

    useEffect(() => {
        dispatch({
            type: 'GET_UNIT_LESSON_CONTENT',
            payload: { unitId, lessonId, contentId }
        });
    }, []);

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/" to={`/unit/${unitId}`}>
                    {content?.unitName}
                </Link>
                <Typography color="text.primary">{content?.lessonName}</Typography>
                <Typography color="text.primary">{content?.contentTitle}</Typography>
            </Breadcrumbs >
            <Card id='contentHeader'>
                {content ?
                    <>
                        <h1>{content.contentTitle}</h1>
                        <h2>{content.contentDescription}</h2>
                    </> :
                    <></>
                }
            </Card>
            {/* <video width="320" height="240" controls >
                <source src="https://baby-know-mn.s3.us-east-2.amazonaws.com/uploads/46366e41-b9fc-4039-9dc2-d4c8224c068b-Mindful+Moments+%239.mp4" type="video/mp4"></source>
            </video> */}
            {/* <Player
                playsInline
                src="https://baby-know-mn.s3.us-east-2.amazonaws.com/uploads/46366e41-b9fc-4039-9dc2-d4c8224c068b-Mindful+Moments+%239.mp4"
            /> */}
        </>
    );

}

export default ContentPage;