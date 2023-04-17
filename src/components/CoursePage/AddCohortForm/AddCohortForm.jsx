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

function AddCohortForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ cohort, setCohort ] = useState("")

  //Variable to show whether the add cohort form is showing
  const showForm = useSelector(
    (store) => store.conditionalForms?.showCohortForm
  );

  async function addCohort () {
    console.log(cohort)
    try { 
      axios.post("/api/cohort", {cohort})
      dispatch({
        type: "SET_SHOW_ADD_COHORT",
        payload: false,
      });
      setCohort("")
    }
    catch (error) {
      console.log("Error posting Cohort:", error)
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
          Add New Cohort
          <IconButton
            onClick={() => {
              dispatch({
                type: "SET_SHOW_ADD_COHORT",
                payload: false,
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
            label="Cohort Name"
            value={cohort}
            onChange={(event) => setCohort(event.target.value)}
            />
          <button onClick={addCohort}>Add Cohort</button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
export default AddCohortForm;




