import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AddUnitForm from "./AddUnitForm/AddUnitForm";
import AddCohortForm from "./AddCohortForm/AddCohortForm";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function CoursePage() {
  const dispatch = useDispatch();
  const history = useHistory();
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
    <div className="container">
      <h1>Course Page!</h1>
      <h2>Welcome, {user.firstName}!</h2>
      <button
        onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_UNIT",
            payload: true,
          });
        }}
      >
        Add Unit
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_COHORT",
            payload: true,
          });
        }}
      >
        Add Cohort
      </button>
      <AddUnitForm />
      <AddCohortForm />

      <div>
        {units.map((unit, i) => {
          //Variable to check if this card is currently being edited
          const isCurrentlyEditing = updatedUnitToSend.id === unit.id;
          return (
            <div key={i}>
              <Grid
                container
                display="flex"
                direction="column"
                alignItems="center"
                justify="center"
                spacing={3}
              >
                {isCurrentlyEditing ? (
                  <form>
                    <Grid item m={2} display="flex">
                      <Card
                        key={unit.id}
                        sx={{ maxWidth: 320, maxHeight: 1000 }}
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
                    </Grid>
                  </form>
                ) : (
                  <Grid item m={2} display="flex">
                    <Card key={unit.id} sx={{ maxWidth: 320, maxHeight: 1000 }} onClick={() => selectUnit(unit.id)}>
                      <CardContent>
                        <p>{unit.name}</p>
                        <p>{unit.subtitle}</p>
                      </CardContent>
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
                  </Grid>
                )}
              </Grid>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default CoursePage;
