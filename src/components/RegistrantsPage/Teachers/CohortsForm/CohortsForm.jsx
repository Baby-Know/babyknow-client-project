import { TextField, useTheme, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tokens } from "../../../../theme";

function CohortsForm() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cohortToAdd, setCohortToAdd] = useState({ name: "" });

  return (
    <>
      <TextField
        value={cohortToAdd.name}
        variant="outlined"
        onChange={(event) => setCohortToAdd({ name: event.target.value })}
      />
      <Button
        onClick={() => {
          dispatch({ type: "ADD_COHORT", payload: cohortToAdd });
          setCohortToAdd({ name: "" });
        }}
      >
        Add Cohort
      </Button>
    </>
  );
}

export default CohortsForm;
