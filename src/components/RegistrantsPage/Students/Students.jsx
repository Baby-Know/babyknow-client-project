import axios from "axios";
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Students = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const students = useSelector((store) => store.studentsReducer);

    //Fetch new registrants on page load
    useEffect(() => {
        dispatch({
            type: "GET_STUDENTS",
        });
    }, []);

    // Set the new copy of the registrants as the state
    useEffect(() => {
        setStudents(students);
    }, [students]);

    // New state variable to hold the modified newRegistrants list
    const [modifiedStudents, setStudents] = useState([]);

    //Function for handling deleting a row
    function handleDelete(event, cellValues) {
        let rowToDelete = cellValues.row;

        axios.delete(`/api/students/${rowToDelete.id}`).then(() => {
            dispatch({
                type: "GET_STUDENTS",
            });
        });
    }

    //Change the value of the item in the modifiedRegistrants array
    const handleEditCellChange = useCallback((params) => {
        const { id, field, value } = params;
        setStudents((prevStudent) =>
            prevStudent.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    }, []);

    //Handle sending the newRegistrants to update to the database
    const handleEditCell = useCallback(
        (params) => {
            const { id, field, value } = params;
            const itemToBeUpdated = modifiedStudents.find(
                (item) => item.id === id
            );
            itemToBeUpdated[field] = value;
            axios
                .put(`/api/students/${id}`, { payload: itemToBeUpdated })
                .then(() => {
                    dispatch({
                        type: "GET_STUDENTS",
                    });
                })
                .catch((error) => {
                    console.log("PUT ERROR", error);
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
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            cellClassName: "delete-btn-column-cell",
            editable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <IconButton
                        onClick={(event) => {
                            handleDelete(event, cellValues);
                        }}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                );
            },
        },
        { field: "id", headerName: "ID", hide: true },
    ];
    return (
        // HEADER
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
                        backgroundColor: `${theme.palette.mode === "light"
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

export default Students;
