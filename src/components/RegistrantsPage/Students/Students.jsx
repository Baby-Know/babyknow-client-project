import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import { Select, MenuItem, Tooltip, Input } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const Students = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const studentsData = useSelector(
    (store) => store.studentsReducer.allStudentsReducer
  );

  //All cohorts
  const cohorts = useSelector((store) => store.cohortReducer);

  //All units
  const units = useSelector((store) => store.unit);

  //Variable stating whether a row is being edited or not
  const [isEditing, setIsEditing] = useState(null);

  // New state variable to hold the modified students list
  const [modifiedStudentData, setModifiedStudentData] = useState([]);

  //Fetch new registrants, cohorts, and available units on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_STUDENTS",
    });

    dispatch({
      type: "FETCH_COHORTS",
    });

    dispatch({
      type: "GET_UNITS",
    });
  }, []);

  // Set the new copy of the registrants as the state
  useEffect(() => {
    setModifiedStudentData(studentsData);
  }, [studentsData]);

  //Function for handling deleting a row
  function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;

    dispatch({
      type: "DELETE_STUDENT",
      payload: rowToDelete.id,
    });
  }

  //Function to handle changing the student's cohort in the modified students array
  const handleCohortChange = useCallback(
    ({ cellValues, value }) => {
      const id = cellValues.id;
      //Find the new cohort for the student
      const newCohort = cohorts?.find((cohort) => cohort.id === value);

      setModifiedStudentData((prevStudentData) =>
        //Mapping over the previous state to find which student to give the new
        //cohort to
        prevStudentData.map((student) =>
          student.id === id
            ? {
                ...student,
                cohort: {
                  id: newCohort?.id,
                  name: newCohort?.name,
                },
              }
            : student
        )
      );
    },
    [modifiedStudentData]
  );

  function handleEditSelect(cellValues) {
    const studentToUpdate = cellValues.row;

    dispatch({
      type: "UPDATE_STUDENT",
      payload: studentToUpdate,
    });
  }

  //Change the value of the item in the modifiedStudents array
  const handleEditCellChange = useCallback((cellValues) => {
    const { id, field, value } = cellValues;
    //Resetting the students array with the updated cell value
    setModifiedStudentData((prevStudentData) => {
      return prevStudentData.map((student) =>
        //If the students id matches the upadted student's id change the value else
        //return the student
        student.id === id ? { ...student, [field]: value } : student
      );
    });
  }, []);

  //Handle sending the modified student to update to the database
  const handleEditCell = useCallback(
    (cellValues) => {
      const { id, field, value } = cellValues;
      const studentToUpdate = modifiedStudentData.find(
        (student) => student.id === id
      );
      studentToUpdate[field] = value;
      dispatch({
        type: "UPDATE_STUDENT",
        payload: studentToUpdate,
      });
    },
    [modifiedStudentData]
  );

  const handleEditUnitChange = useCallback(
    (cellValues, value) => {
      const { id } = cellValues;
      let studentUnits = [];

      //Find the id of the units that have been changed
      value.map((unit) => {
        let matchingUnit = units.find(
          (availableUnit) => unit === availableUnit.name
        );
        studentUnits.push(matchingUnit);
      });

      //Resetting the students array with the updated units
      setModifiedStudentData((prevStudentData) => {
        return prevStudentData.map((student) =>
          student.id === id
            ? { ...student, studentUnits: studentUnits }
            : student
        );
      });
    },
    [modifiedStudentData]
  );

  //For every row this grabs the value from the key to put into the "headerName" column
  const columns = [
    {
      field: "email",
      headerName: "E-mail",
      // flex is allowing the cells to grow
      flex: 1,
      editable: true,
    },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      editable: true,
    },
    {
      field: "cohort.id",
      headerName: "Cohort",
      editable: false,
      filterable: false,
      renderCell: (cellValues) => (
        <Select
          variant="standard"
          value={cellValues.row.cohort.id}
          onChange={(event) => {
            setIsEditing(cellValues.id);
            handleCohortChange({
              cellValues: cellValues,
              value: event.target.value,
            });
          }}
        >
          {cohorts.map((cohort, i) => (
            <MenuItem key={i} value={cohort.id}>
              {cohort.name}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "units",
      headerName: "Units",
      editable: false,
      filterable: false,
      flex: 0.7,
      renderCell: (cellValues) => {
        //Finding specific student
        let studentObject = modifiedStudentData.find((student) => {
          return student.id === cellValues.id;
        });

        //Convert students current units keys to an array
        const studentUnitsIdArr = Object.keys(studentObject.studentUnits);

        //Mapping over student's current unit's keys (mapping over units object)
        let initialSelected = studentUnitsIdArr?.map((unitId) => {
          return studentObject?.studentUnits[unitId].name;
        });

        const [selectedOptions, setSelectedOptions] = useState(initialSelected);

        const handleChange = (event) => {
          setSelectedOptions(event.target.value);
        };

        return (
          <>
            <Select
              variant="standard"
              multiple
              value={selectedOptions}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              onChange={(event) => {
                setIsEditing(cellValues.id);
                handleEditUnitChange(cellValues, event.target.value);
                handleChange(event);
              }}
            >
              {/* Mapping over available units and checking if the user is signed up for them */}
              {units?.map((unit, i) => {
                return (
                  <MenuItem key={unit.id} value={unit.name}>
                    <Checkbox
                      checked={selectedOptions.indexOf(unit.name) > -1}
                    />
                    <ListItemText primary={unit.name} />
                  </MenuItem>
                );
              })}
            </Select>
          </>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      cellClassName: "delete-btn-column-cell",
      editable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <>
            {isEditing === cellValues.id ? (
              <>
                <Tooltip title="Confirm Edit">
                  <IconButton
                    onClick={() => {
                      handleEditSelect(cellValues);
                      setIsEditing(null);
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel Edit">
                  <IconButton
                    onClick={() => {
                      setIsEditing(null);
                      dispatch({
                        type: "FETCH_STUDENTS",
                      });
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <></>
            )}
            <Tooltip title="Delete Student">
              <IconButton
                onClick={(event) => {
                  handleDelete(event, cellValues);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
    { field: "id", headerName: "ID", hide: true, filterable: false },
  ];
  return (
    <Box
      //All styling on the table and box holding it
      margin="auto"
      width="70vw"
      height="70vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          fontSize: "small",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: `${
            theme.palette.mode === "light"
              ? colors.darkTealAccent[900]
              : colors.darkTealAccent[700]
          }`,
          fontSize: "1rem",
        },
        "& .MuiDataGrid-columnHeader": {
          backgroundColor: colors.darkTealAccent[800],
          fontSize: "1rem",
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.darkTealAccent[800],
        },
      }}
    >
      <DataGrid
        rows={modifiedStudentData || []}
        columns={columns}
        onCellEditCommit={handleEditCell}
        onEditCellChange={handleEditCellChange}
        disableColumnSelector
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default Students;
