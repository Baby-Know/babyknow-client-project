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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddLessonForm from './AddLessonForm/AddLessonForm';

function UnitPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const unit = useSelector(store => store.unit);

    useEffect(() => {
        dispatch({
            type: "GET_UNIT",
            payload: id
        });

    }, []);

    return (
        <>
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

            <AddLessonForm id={id} />

            {unit.map((lesson, i) => {
                return (
                    <div key={i}>
                        {i === 0 ?
                            <>
                                <h1>{lesson.unitsName}</h1>
                                <h2>{lesson.subtitle}</h2>
                            </>
                            : <></>}
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{lesson.lessonsName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                {lesson.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        
                    </div>
                )
            })}
        </>
    )
}

export default UnitPage;