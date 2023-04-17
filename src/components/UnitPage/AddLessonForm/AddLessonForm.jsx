import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../theme";
import { IconButton, TextField, Button } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";

function AddLessonForm({id}) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    //Setting initial values so that they are controlled for MUI
    const [lessonToSend, setLessonToSend] = useState({
      name: "",
      description: "",
  });

    //Variable to show whether the add lesson form is showing
    const showForm = useSelector((store) => store.conditionalForms?.showLessonForm);

    //Function to handle sending new lesson to the database
  async function handleAddLesson() {
    try {
     await axios.post(`/api/lesson/${id}`, lessonToSend);
     dispatch({type: 'GET_UNIT', payload: id});


     dispatch({
      type: "SET_SHOW_ADD_LESSON",
      payload: false });

      //Clear inputs
      setLessonToSend({
        name: "",
        description: ""
      });
    } catch (error) {
      console.log("Error posting new unit:", error);
    }
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
          Add New Lesson
          <IconButton
            onClick={() => {
              dispatch({
                type: "SET_SHOW_ADD_LESSON",
                payload: false
              });
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            type="text"
            label="Lesson Name"
            value={lessonToSend.name}
            onChange={(event) => {
              setLessonToSend({
                ...lessonToSend,
                name: event.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            type="text"
            label="Lesson Description"
            value={lessonToSend.description}
            onChange={(event) => {
              setLessonToSend({
                ...lessonToSend,
                description: event.target.value,
              });
            }}
          />
          <Button
          variant="outlined"
            onClick={() => {
              handleAddLesson();
            }}
          >
            Add Lesson
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );

}

export default AddLessonForm;
