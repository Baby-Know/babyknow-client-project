import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import AddLessonForm from './AddLessonForm/AddLessonForm';

function UnitPage() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);

    return (
        <>
            <h1>UNIT PAGE {id}</h1>

            <button
                onClick={() => {
                    dispatch({
                        type: "SET_SHOW_ADD_LESSON",
                        payload: true,
                    });
                }}
            >
                Add Lesson
            </button>
            <AddLessonForm id={id}/>
        </>

        // pass id as prop in form

    )
}

export default UnitPage;