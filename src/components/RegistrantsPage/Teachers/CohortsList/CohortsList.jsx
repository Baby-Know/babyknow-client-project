import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@mui/system";
import { tokens } from "../../../../theme";
import { IconButton, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Edit from "@mui/icons-material/Edit";
import Cancel from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

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

  //All cohorts
  const cohorts = useSelector((store) => store.cohortReducer);

  //Updated cohort to send to the database
  const [updatedCohortToSend, setUpdatedCohortToSend] = useState({
    id: null,
    name: "",
  });

  //Function to handle deleting a cohort
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

  //Funciton to handle editing a cohort
  function handleEdit(cohort) {
    dispatch({
      type: "UPDATE_COHORT",
      payload: updatedCohortToSend,
    });

    setUpdatedCohortToSend({ id: null, name: "" });
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

      {cohorts?.map((cohort, i) => {
        //Variable to check if this cohort is currently being edited
        const isCurrentlyEditing = updatedCohortToSend.id === cohort.id;
        return (
          <Box
            key={i}
            display="flex"
            justifyContent="space-between"
            width="70%"
            margin="auto"
          >
            {!isCurrentlyEditing ? (
              <>
                <Typography variant="h4">{cohort.name}</Typography>
                <Box>
                  <IconButton
                    onClick={() => {
                      setUpdatedCohortToSend({
                        name: cohort.name,
                        id: cohort.id,
                      });
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cohort.id)}>
                    <DeleteForever />
                  </IconButton>
                </Box>
              </>
            ) : (
              <>
                <TextField
                  key={i}
                  variant="standard"
                  value={updatedCohortToSend.name}
                  onChange={(event) => {
                    setUpdatedCohortToSend({
                      ...updatedCohortToSend,
                      name: event.target.value,
                    });
                  }}
                />
                <IconButton
                  onClick={() => setUpdatedCohortToSend({ id: null, name: "" })}
                >
                  <Cancel />
                </IconButton>
                <IconButton onClick={handleEdit}>
                  <CheckIcon />
                </IconButton>
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
export default CohortsList;
