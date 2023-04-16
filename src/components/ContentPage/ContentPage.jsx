import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@mui/material";

function ContentPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const contentArray = useSelector(store => store.contentReducer)
    const content = contentArray[0]

    console.log('content', content)

    useEffect(() => {
        dispatch({
            type: "GET_CONTENT",
            payload: id
        });
    }, []);

    return (
        <>
            <Card id='contentHeader'>
                {content ?
                    <>
                        <h1>{content.title}</h1>
                        <h2>{content.description}</h2>
                    </> :
                    <></>
                }
            </Card>
            <video src="https://baby-know-mn.s3.us-east-2.amazonaws.com/uploads/5b0e441c-51c8-4502-9021-01d69fac8a70-Mindful+Moments+%239.mp4" width="750" height="500" controls > </video>
        </>

    )
}

export default ContentPage;