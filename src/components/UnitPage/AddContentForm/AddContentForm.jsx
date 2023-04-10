import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import { IconButton, TextField } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";

function AddContentForm() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const showForm = useSelector((store) => store.conditionalForms?.showContentForm);

    const [contentToSend, setContentToSend] = useState({
        content: "",
        title: "",
        description: "",
        isSurvey: false,
        isRequired: false
    });

    function handleAddContent() {
        dispatch({type: "ADD_CONTENT", 
        payload: contentToSend,
        callback: setContentToSend})
    }
    
}    


export default AddContentForm;