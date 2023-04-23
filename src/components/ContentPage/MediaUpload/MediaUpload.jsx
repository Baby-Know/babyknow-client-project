import { useState} from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBar from "../../LoadingBar/LoadingBar";

function MediaUpload({ userId, contentId, userContentId }) {
    console.log('userId', userId, 'contentId', contentId, 'userContentId', userContentId)
    const [mediaToSend, setMediaToSend] = useState({
        media: ''
    });
    const dispatch = useDispatch();
    const isLoading = useSelector((store) => store.loadingReducer);
    

    const handleAddMedia = () => {
        dispatch({ type: 'POST_MEDIA', 
        payload: {mediaToSend, userContentId, userId, contentId }})
    }

    return (
        <>
         {isLoading ?
                <LoadingBar /> : <></>}

        <form onSubmit={(event) => handleAddMedia(event)}>

            <input
                autoFocus
                margin="dense"
                type="file"
                name="file"
                onChange={(event) => {
                    setMediaToSend({
                        ...mediaToSend,
                        media: event.target.files[0]
                    });
        
                }}
            />

            <Button 
            variant="outlined"
            type='submit'
            value='Submit' > Upload </Button>

        </form>
        </>

    )

};

export default MediaUpload;