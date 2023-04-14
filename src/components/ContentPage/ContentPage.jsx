import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography, Breadcrumbs } from "@mui/material";

function ContentPage({ lessonBreadCrumb }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const contentArray = useSelector(store => store.contentReducer);
    const content = contentArray;

    console.log('content', content);

    useEffect(() => {
        dispatch({
            type: "GET_CONTENT",
            payload: id
        });
    }, []);

    lessonBreadCrumb = location.state.detail;
    console.log('Content lessonBreadCrumb', lessonBreadCrumb);

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    {/* {lessonBreadCrumb.unitName} */}
                </Link>
                {/* <Typography color="text.primary">{lessonBreadCrumb.lessonName}</Typography> */}
                <Typography color="text.primary">{content?.title}</Typography>
            </Breadcrumbs>
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