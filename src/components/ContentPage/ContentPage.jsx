import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@mui/material";

function ContentPage () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const contentArray = useSelector(store => store.contentReducer)
    const content = contentArray[0]

    console.log(content)

    useEffect(() => {
        dispatch({
            type: "GET_CONTENT",
            payload: id
        });
    }, []);

    return(
        <Card id='contentHeader'>
                {content ? 
                    <>
                        <h1>{content.title}</h1>
                        <h2>{content.description}</h2> 
                    </> :
                    <></>
                }
        </Card>
    )
}

export default ContentPage