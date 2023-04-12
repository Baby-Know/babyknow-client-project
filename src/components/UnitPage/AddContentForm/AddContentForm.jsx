import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import {
    IconButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Checkbox,
    Button
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useState } from "react";


function AddContentForm({selectedId}) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const showForm = useSelector((store) => store.conditionalForms?.showContentForm);
    // const [file, setFile] = useState(null);

    const [contentToSend, setContentToSend] = useState({
        content: "",
        title: "",
        description: "",
        isSurvey: false,
        isRequired: false,
    });

    const [contentOrder, setContentOrder] = useState({
        contentOrder: "",
        lessons_id: selectedId
    })

    // useEffect(()=> {
    //     console.log('File has been set.', file)
    // }, [file]);

    function handleAddContent() {
        dispatch({
            type: "ADD_CONTENT",
            payload: {contentToSend, contentOrder},
            callback: setContentToSend
        });
           
};

    function uploadVideo(event) {
        dispatch({
            type: 'UPLOAD_VIDEO',
            payload: {
              file: event
            }
        })  
    }


    return (
        <Box>
            <Dialog
                open={showForm}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: colors.tealAccent[800],
                    },
                }}
            >
                <DialogTitle variant="h3" color={colors.primary[500]} mb="5%">
                    Add Content
                    <IconButton
                        onClick={() => {
                            dispatch({
                                type: "SET_SHOW_ADD_CONTENT",
                                payload: false
                            });
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    
                    <form onSubmit={handleAddContent} >
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">Select upload type:</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue="video"
                            name="radio-buttons-group"
                            value={contentToSend.isSurvey}
                            onChange={() => {setContentToSend({...contentToSend, isSurvey: !contentToSend.isSurvey})}}
                        >
                            <FormControlLabel value={false} control={<Radio />} label="Video Upload" />
                            <FormControlLabel value={true} control={<Radio />} label="Survey" />
                            </RadioGroup>
                            
                            {/* form to upload video and set file for multer */}
                            <form encType="multipart/form-data" onSubmit={uploadVideo}>
                            {!contentToSend.isSurvey && <TextField
                                autoFocus
                                margin="dense"
                                type={contentToSend.isSurvey ? "text" : "file"}
                                label={contentToSend.isSurvey ? "Survey Link" : ""}
                                value={contentToSend.isSurvey ? contentToSend.content : ""}
                                onChange={(event) => {
                                    setContentToSend({
                                        ...contentToSend,
                                        content: contentToSend.isSurvey ? event.target.value : event.target.files[0]
                                    });
                                }}
                            />
}
                            {contentToSend.isSurvey ? "" : <Button type='submit' color='secondary'>Upload Video</Button>}
                            </form>
                            
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                type="text"
                                label={contentToSend.isSurvey ? "Survey Title" : "Video Title"}
                                value={contentToSend.title}
                                onChange={(event) => {
                                    setContentToSend({
                                        ...contentToSend,
                                        title: event.target.value,
                                    });
                                }}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                type="number"
                                label={contentToSend.isSurvey ? "Survey Order" : "Video Order"}
                                value={contentOrder.contentOrder}
                                onChange={(event) => {
                                    setContentOrder({
                                        ...contentOrder,
                                        contentOrder: event.target.value,
                                        
                                    });
                                    console.log("content order", contentOrder)
                                }}
                            />
        
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                type="text"
                                label="Description"
                                value={contentToSend.description}
                                onChange={(event) => {
                                    setContentToSend({
                                        ...contentToSend,
                                        description: event.target.value
                                    });
                                }}
                            />
                            <FormControlLabel control={<Checkbox />} label="Required" 
                            onChange={() => {setContentToSend({...contentToSend, isRequired: !contentToSend.isRequired})}}/>
                            <Button variant="outlined" type='submit' value='Submit'> Save</Button>
                    </FormControl>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};



export default AddContentForm;