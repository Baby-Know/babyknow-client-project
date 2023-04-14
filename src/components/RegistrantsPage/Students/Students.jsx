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

  const studentsData = useSelector((store) => store.studentsReducer);

  //Variable stating whether a row is being edited or not
  const [isEditing, setIsEditing] = useState(null);

  // New state variable to hold the modified students list
  const [modifiedStudentData, setModifiedStudentData] = useState({
    students: [],
    teachers: [],
    cohorts: [],
    units: [],
  });

  //Fetch new registrants on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_STUDENTS",
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

  //Handle changing the value of the select option in the students array
  //of the modifiedStudentData object
  const handleSelectChange = useCallback(
    ({ cellValues, value }) => {
      const field = cellValues.field === "cohort.id" ? "cohort" : "teacher";
      const id = cellValues.id;

      //Finding the new value that the student will be given
      const newValue =
        field === "cohort"
          ? modifiedStudentData.cohorts.find((cohort) => cohort.id === value)
          : modifiedStudentData.teachers.find(
              (teacher) => teacher.id === value
            );

      //New value alternates between teacher and cohort object so this is updating
      //the student differently depending on whether the new value is a teacher or cohort
      field === "cohort"
        ? setModifiedStudentData((prevStudentData) => {
            return {
              ...prevStudentData,
              students: prevStudentData.students.map((student) =>
                student.id === id
                  ? {
                      ...student,
                      cohort: {
                        id: newValue.id,
                        name: newValue.name,
                      },
                    }
                  : student
              ),
            };
          })
        : setModifiedStudentData((prevStudentData) => {
            return {
              ...prevStudentData,
              students: prevStudentData.students.map((student) =>
                student.id === id
                  ? {
                      ...student,
                      teacher: {
                        id: newValue.id,
                        firstName: newValue.firstName,
                        lastName: newValue.lastName,
                      },
                    }
                  : student
              ),
            };
          });
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

  //Change the value of the item in the modifiedRegistrants array
  const handleEditCellChange = useCallback((cellValues) => {
    const { id, field, value } = cellValues;
    //Resetting the students array with the updated student
    setModifiedStudentData((prevStudentData) => {
      return {
        ...prevStudentData,
        students: prevStudentData.students.map((student) =>
          student.id === id ? { ...student, [field]: value } : student
        ),
      };
    });
  }, []);

  //Handle sending the modified student to update to the database
  const handleEditCell = useCallback(
    (cellValues) => {
      const { id, field, value } = cellValues;
      const studentToUpdate = modifiedStudentData.students.find(
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
        let matchingUnit = modifiedStudentData.units.find(
          (availableUnit) => unit === availableUnit.name
        );
        studentUnits.push(matchingUnit);
      });

      //Find the student that has updated units
      let studentToModify = modifiedStudentData.students.find(
        (student) => student.id === id
      );

      //Add the units to the student
      studentToModify = {
        ...studentToModify,
        studentUnits: studentUnits,
      };

      //Resetting the students array with the updated student
      setModifiedStudentData((prevStudentData) => {
        return {
          ...prevStudentData,
          students: prevStudentData.students.map((student) =>
            student.id === id
              ? { ...student, studentUnits: studentUnits }
              : student
          ),
        };
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
      renderCell: (cellValues) => (
        <Select
          variant="standard"
          value={cellValues.row.cohort.id}
          onChange={(event) => {
            setIsEditing(cellValues.id);
            handleSelectChange({
              cellValues: cellValues,
              value: event.target.value,
            });
          }}
        >
          {modifiedStudentData.cohorts.map((option, i) => (
            <MenuItem key={i} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "teacher.id",
      headerName: "Teacher",
      editable: false,
      renderCell: (cellValues) => (
        <Select
          variant="standard"
          value={cellValues.row.teacher.id}
          onChange={(event) => {
            setIsEditing(cellValues.id);
            handleSelectChange({
              cellValues: cellValues,
              value: event.target.value,
            });
          }}
        >
          {modifiedStudentData.teachers.map((teacher, i) => (
            <MenuItem key={i} value={teacher.id}>
              {teacher.firstName} {teacher.lastName}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "units",
      headerName: "Units",
      editable: false,
      flex: 1,
      renderCell: (cellValues) => {
        //Finding specific student
        let studentObject = modifiedStudentData.students.find((student) => {
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
              {modifiedStudentData?.units?.map((unit, i) => {
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
    { field: "id", headerName: "ID", hide: true },
  ];
  return (
    <Box>
      <Box
        //All styling on the table and box holding it
        mt="15px"
        height="70vh"
        width="62vw"
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
            fontSize: "0.9rem",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.darkTealAccent[800],
            fontSize: "0.9rem",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.darkTealAccent[800],
          },
        }}
      >
        <DataGrid
          rows={modifiedStudentData.students || []}
          columns={columns}
          onCellEditCommit={handleEditCell}
          onEditCellChange={handleEditCellChange}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Students;
