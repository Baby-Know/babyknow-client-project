import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
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
    console.log("lesson id passed as prop", selectedId);
    // console.log('contentOrder payload', contentOrder)

    function handleAddContent() {
        dispatch({
            type: "ADD_CONTENT",
            payload: {contentToSend, contentOrder},
            callback: setContentToSend
        })
    };

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
                    <form onSubmit={handleAddContent}>
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">Select upload type:</FormLabel>
                        <RadioGroup
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue="video"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value={contentToSend.isSurvey} control={<Radio />} label="Video Upload" />
                            <FormControlLabel value={!contentToSend.isSurvey} control={<Radio />} label="Survey" />


                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                type="text"
                                label="Content"
                                value={contentToSend.content}
                                onChange={(event) => {
                                    setContentToSend({
                                        ...contentToSend,
                                        content: event.target.value,
                                    });
                                }}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                fullWidth
                                type="text"
                                label="Video Title"
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
                                label="Content Order"
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
                                label="Video Description"
                                value={contentToSend.description}
                                onChange={(event) => {
                                    setContentToSend({
                                        ...contentToSend,
                                        description: event.target.value,
                                    });
                                }}
                            />
                            <FormControlLabel control={<Checkbox />} label="Required" />
                            <Button variant="outlined" type='submit' value='Submit'> Save</Button>
                        </RadioGroup>
                    </FormControl>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};



export default AddContentForm;