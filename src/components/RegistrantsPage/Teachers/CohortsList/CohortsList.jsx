import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../../theme";
import { IconButton, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";

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

  function handleDelete(id) {
    dispatch({
      type: "DELETE_COHORT",
      payload: id,
    });

    dispatch({
      type: "FETCH_TEACHERS",
      payload: id,
    });
  }

  return (
    <Box
      sx={{
        width: "30vw",
        height: "40vh",
        backgroundColor: colors.primary[700],
      }}
    >
      <Typography variant="h2" fontWeight="bold" textAlign="center">
        All Cohorts
      </Typography>

      {cohorts?.map((cohort) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            width="70%"
            margin="auto"
          >
            <Typography variant="h4">{cohort.name}</Typography>
            <Box>
              <IconButton>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(cohort.id)}>
                <DeleteForever />
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
export default CohortsList;
