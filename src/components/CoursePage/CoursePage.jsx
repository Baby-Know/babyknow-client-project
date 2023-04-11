import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AddUnitForm from "./AddUnitForm/AddUnitForm";
import AddCohortForm from "./AddCohortForm/AddCohortForm";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

function CoursePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const user = useSelector((store) => store.user);
  const units = useSelector((store) => store.unit);

  //Updated unit to send to the database
  const [updatedUnitToSend, setUpdatedUnitToSend] = useState({
    id: "",
    name: "",
    unitOrder: "",
    subtitle: "",
  });

  useEffect(() => {
    dispatch({ type: "GET_UNITS" });
  }, []);

  //Function to set the updatedUnitToSend's initial values to the current values
  const handleEditField = (event, key) => {
    setUpdatedUnitToSend({
      ...updatedUnitToSend,
      [key]: event.target.value,
    });
  };

  // Function to handle editing a unit in the database
  async function postEditedUnit() {
    dispatch({
      type: "UPDATE_UNIT",
      payload: updatedUnitToSend,
    });

    //Unselecting the unit
    setUpdatedUnitToSend({
      id: "",
      name: "",
      unitOrder: "",
      subtitle: "",
    });
  }

  const deleteUnit = (id) => {
    dispatch({
      type: "DELETE_UNIT",
      payload: id,
    });
  };

  const selectUnit = (id) => {
    history.push(`/unit/${id}`)
  }

  return (
    <Box
      sx={{
        "& .MuiButton-sizeMedium": {
          backgroundColor: colors.tealAccent[500],
        },
        "& .MuiButton-sizeMedium:hover": {
          backgroundColor: colors.tealAccent[700],
        },
         display: 'box',
         gridTemplateColumns: 'repeat(3, 1fr)'
      }}
      className="container">
      <h1 style={{ marginLeft: 20}} >Course</h1>
      <h2 style={{ marginLeft: 20}} >Welcome, {user.firstName}!</h2>
      <AddUnitForm />
      <AddCohortForm />

      <div>
              <Grid
                container
                m={4}
                sx={{ display: 'flex', justifyContent: 'space-around', marginLeft: 0}}
              >
              {units.map((unit, i) => {
              //Variable to check if this card is currently being edited
              const isCurrentlyEditing = updatedUnitToSend.id === unit.id;
              return (
                <div id='unitGrid' key={i} style={{ display: 'grid',  justifyContent:'space-between', cursor: 'pointer', marginLeft: 100, marginRight: 100 , marginBottom: 25 , marginTop: 25}} >
                {isCurrentlyEditing ? (
                  <form>
                      <Card
                        key={unit.id}
                        sx={{ maxWidth: 320, maxHeight: 1000, justifyContent: 'center' }}
                      >
                        <CardContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            type="text"
                            label="Unit Name"
                            value={updatedUnitToSend.name}
                            onChange={(event) => handleEditField(event, "name")}
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            type="number"
                            label="Unit Order"
                            value={updatedUnitToSend.unitOrder}
                            onChange={(event) =>
                              handleEditField(event, "unitOrder")
                            }
                          />
                          <TextField
                            autoFocus
                            margin="dense"
                            fullWidth
                            type="text"
                            label="Unit Subtitle"
                            value={updatedUnitToSend.subtitle}
                            onChange={(event) =>
                              handleEditField(event, "subtitle")
                            }
                          />
                        </CardContent>
                        <IconButton
                          onClick={() => {
                            postEditedUnit();
                          }}
                        >
                          <DoneIcon />
                        </IconButton>
                      </Card>
                  </form>
                ) : (
                    <Card key={unit.id} sx={{ width: 200, height: 200, textAlign: 'center', justifyContent: 'center'  }}>
                      <CardContent sx={{ mb: 4 }} onClick={() => selectUnit(unit.id)}>
                        <p style={{ fontWeight: 'bold', fontSize: 18 }} >{unit.name}</p>
                        <p>{unit.subtitle}</p>
                      </CardContent >
                      <IconButton
                        onClick={() => {
                          setUpdatedUnitToSend({
                            id: unit.id,
                            name: unit.name,
                            unitOrder: unit.unitOrder,
                            subtitle: unit.subtitle,
                          });
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteUnit(unit.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </Card>
                )}
                </div>
                );
              })}
              </Grid>

      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Button
          sx={{ margin: 10 }}
          onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_UNIT",
            payload: true,
          });
          }}
          
          >
            Add Unit
          </Button>
          <Button
            sx={{ margin: 10 }}
            onClick={() => {
              dispatch({
                type: "SET_SHOW_ADD_COHORT",
                payload: true,
              });
            }}
      
          >
            Add Cohort
          </Button>
        </div>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default CoursePage;
