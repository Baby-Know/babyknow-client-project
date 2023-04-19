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

function AddCohortForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cohort, setCohort] = useState("");

  //Variable to show whether the add cohort form is showing
  const showForm = useSelector(
    (store) => store.conditionalForms?.showCohortForm
  );

  async function addCohort() {
    try {
      axios.post("/api/cohort", { cohort });
      dispatch({
        type: "SET_SHOW_ADD_COHORT",
        payload: false,
      });
      setCohort("");
    } catch (error) {
      console.log("Error posting Cohort:", error);
    }
  }

  return <Box></Box>;
}
export default AddCohortForm;
