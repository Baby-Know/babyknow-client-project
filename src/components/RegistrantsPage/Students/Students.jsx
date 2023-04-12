import axios from "axios";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckIcon from "@mui/icons-material/Check";
import { Select, MenuItem, Tooltip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const NewRegistrants = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const students = useSelector((store) => store.studentsReducer);

  //Variable stating whether a row is being edited or not
  const [isEditing, setIsEditing] = useState(null);

  const accessOptions = [
    { value: 0, label: "New" },
    { value: 1, label: "Student" },
    { value: 2, label: "Teacher" },
    { value: 3, label: "Admin" },
  ];

  // New state variable to hold the modified newRegistrants list
  const [modifiedStudents, setModifiedStudents] = useState({});

  //Fetch new registrants on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_STUDENTS",
    });
  }, []);

  // Set the new copy of the registrants as the state
  useEffect(() => {
    setModifiedStudents(students);

    console.log(students);
  }, [students]);

  //Function for handling deleting a row
  function handleDelete(event, cellValues) {
    let rowToDelete = cellValues.row;

    dispatch({
      type: "DELETE_STUDENT",
      payload: rowToDelete.id,
    });
  }

  //Handle changing the value of the access select in the modifiedRegistrants array
  const handleSelectAccessChange = useCallback(
    (cellValues) => {
      const value = cellValues.value;
      setModifiedStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === cellValues.cellValues.id
            ? { ...student, access: value }
            : student
        )
      );
    },
    [modifiedStudents]
  );

  function handleEditSelectAccess(cellValues) {
    const { id, field, value } = cellValues;
    const studentToUpdate = cellValues.row;

    setModifiedStudents((prevStudents) =>
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
    setModifiedStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, [field]: value } : student
      )
    );
  }, []);

  //Handle sending the newRegistrants to update to the database
  const handleEditCell = useCallback(
    (params) => {
      const { id, field, value } = params;
      const studentToUpdate = modifiedStudents.find((item) => item.id === id);
      studentToUpdate[field] = value;
      dispatch({
        type: "UPDATE_STUDENT",
        payload: studentToUpdate,
      });
    },
    [modifiedStudents]
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
      field: "organization",
      headerName: "Organization",
      flex: 1,
      editable: true,
    },
    {
      field: "access",
      headerName: "Roles",
      editable: false,
      renderCell: (cellValues) => (
        <Select
          variant="standard"
          value={cellValues.row.access}
          onChange={(event) => {
            setIsEditing(cellValues.id);
            handleSelectAccessChange({
              cellValues: cellValues,
              value: event.target.value,
            });
          }}
        >
          {accessOptions.map((option, i) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ),
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
                      handleEditSelectAccess(cellValues);
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
                        type: "FETCH_NEW_REGISTRANTS",
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
            <Tooltip title="Delete Registrant">
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
          "& .MuiButton-sizeMedium": {
            backgroundColor: colors.greenAccent[500],
          },
          "& .MuiButton-sizeMedium:hover": {
            backgroundColor: colors.greenAccent[700],
          },
        }}
      >
        <DataGrid
          rows={modifiedStudents}
          columns={columns}
          onCellEditCommit={handleEditCell}
          onEditCellChange={handleEditCellChange}
        />
      </Box>
    </Box>
  );
};

export default NewRegistrants;
