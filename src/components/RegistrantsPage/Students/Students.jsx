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

const NewRegistrants = () => {
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

  const [selectDataPerStudent, setSelectDataPerStudent] = useState([]);

  //Fetch new registrants on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_STUDENTS",
    });
  }, []);

  // Set the new copy of the registrants as the state
  useEffect(() => {
    setModifiedStudentData(studentsData);

    const selectNewData = studentsData?.students?.map((student) => {
      return {
        id: student.id,
        units: studentsData?.units?.reduce((data, unit) => {
          //   const isPartOf = student.userUnits.some((u) => u.name === unit.name);
          data[unit.id] = unit.name;
          return data;
        }, {}),
      };
    });
    setSelectDataPerStudent(selectNewData);
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
    (cellValues) => {
      const value = cellValues.value;
      setModifiedStudentData((prevStudents) =>
        prevStudents.students.map((student) =>
          student.id === cellValues.cellValues.id
            ? { ...student, access: value }
            : student
        )
      );
    },
    [modifiedStudentData]
  );

  function handleEditSelect(cellValues) {
    const { id, field, value } = cellValues;
    const studentToUpdate = cellValues.row;

    setModifiedStudentData((prevStudents) =>
      prevStudents.map((student) =>
        student.id === cellValues.id ? { ...student, [field]: value } : student
      )
    );

    dispatch({
      type: "UPDATE_STUDENT",
      payload: studentToUpdate,
    });
  }

  //Change the value of the item in the modifiedRegistrants array
  const handleEditCellChange = useCallback((params) => {
    const { id, field, value } = params;
    setModifiedStudentData((prevStudents) =>
      prevStudents.students.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  }, []);

  //Handle sending the modified student to update to the database
  const handleEditCell = useCallback(
    (params) => {
      const { id, field, value } = params;
      const studentToUpdate = modifiedStudentData.find(
        (item) => item.id === id
      );
      studentToUpdate[field] = value;
      dispatch({
        type: "UPDATE_STUDENT",
        payload: studentToUpdate,
      });
    },
    [modifiedStudentData]
  );

  function handleEditUnitChange() {}

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
            handleEditSelect({
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
      renderCell: (cellValues) => {
        const [selectedOptions, setSelectedOptions] = useState([]);
        let studentObject = selectDataPerStudent?.find(
          (student) => student.id === cellValues.id
        );
        const handleChange = (event) => {
          setSelectedOptions(event.target.value);
        };

        const studentUnitsIdArr = Object.keys(studentObject.units);

        // studentUnitsIdArr?.map((unitId) => {
        //   setSelectedOptions([...selectedOptions, studentObject.units[unitId]]);
        // });

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
                handleEditUnitChange(cellValues);
                handleChange(event);
              }}
              onClick={() => {
                console.log("STUDENT OBJECT", studentObject.units);
              }}
            >
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
      <button
        onClick={() => {
          console.log(modifiedStudentData);
        }}
      >
        clll
      </button>
    </Box>
  );
};

export default NewRegistrants;
