import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../../theme";
import { IconButton, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function CohortsList() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Fetch cohorts on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_COHORTS",
    });
  }, []);

  //Variable to show whether the add cohort form is showing
  const cohorts = useSelector((store) => store.cohortReducer);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[500],
      }}
    >
      {cohorts?.map((cohort) => {
        return <></>;
      })}
    </Box>
  );
}
export default CohortsList;
