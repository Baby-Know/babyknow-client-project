import { useParams } from "react-router-dom"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    Box,
    Button,
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddLessonForm from './AddLessonForm/AddLessonForm';
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

function UnitPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const unit = useSelector(store => store.unit);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    useEffect(() => {
        dispatch({
            type: "GET_UNIT",
            payload: id
        });

    }, []);

    return (
        <Box sx={{ 
            "& .MuiButton-sizeMedium": {
            backgroundColor: colors.tealAccent[500],
            },
            "& .MuiButton-sizeMedium:hover": {
            backgroundColor: colors.tealAccent[700],
            }}}>

            <AddLessonForm id={id} />

            {unit.map((lesson, i) => {
                return (
                    <div key={i}>
                        {i === 0 ?
                            <Card id='unitHeader'>
                                <h1 style={{ fontWeight: 'bold', fontSize: 24, textDecoration: 'underline' }} >{lesson.unitsName}</h1>
                                <h2>{lesson.subtitle}</h2>
                            </Card>
                            : <></>}
                        <Accordion id="accordian">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>{lesson.lessonsName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                - {lesson.description}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>   
                    </div>
                )
            })}
            <div id="addLessonParent">
            <Button
            id='addLesson'
            onClick={() => {
                dispatch({
                    type: "SET_SHOW_ADD_LESSON",
                    payload: true,
                });
                }}
            >
                Add Lesson
            </Button>
            </div>
        </Box>
        
    )
}

export default UnitPage;