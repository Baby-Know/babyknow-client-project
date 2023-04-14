import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Button,
    Card,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    IconButton,
    Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddLessonForm from './AddLessonForm/AddLessonForm';
import AddContentForm from './AddContentForm/AddContentForm';
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

function UnitPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const unit = useSelector(store => store.unit);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        dispatch({
            type: "GET_UNIT",
            payload: id
        });
    }, []);

    const selectContent = (id, lessonBreadcrumb) => {
        console.log('lessonBreadcrumb', lessonBreadcrumb);
        history.push({
            pathname: `/content/${id}`,
            state: { detail: lessonBreadcrumb }
        });
    };

    console.log('unitunitunit', unit);

    const deleteLesson = (ids) => {
        dispatch({
            type: "DELETE_LESSON",
            payload: ids
        });
    };

    const deleteContent = (ids) => {
        dispatch({
            type: "DELETE_CONTENT",
            payload: ids
        });
    };

    return (
        <Box sx={{
            "& .MuiButton-sizeMedium": {
                backgroundColor: colors.darkTealAccent[400],
                color: 'white'
            },
            "& .MuiButton-sizeMedium:hover": {
                backgroundColor: colors.darkTealAccent[600],
                color: 'white'
            }
        }}>

            <AddLessonForm id={id} />

            {unit.map((lesson, i) => {
                return (
                    <div key={i}>
                        {i === 0 ?
                            <Card id='unitHeader'>
                                <h1 style={{ fontWeight: 'bold', fontSize: 24, textDecoration: 'underline' }}
                                >{lesson.unitName}</h1>
                                <h2>{lesson.unitSubtitle}</h2>
                            </Card>
                            : <></>}
                        <Accordion id="accordian">
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>{lesson.lessonName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Typography>
                                    {lesson.lessonDescription}
                                </Typography>


                                {unit[i].contentId?.map((id, index) => {
                                    return (
                                        <div key={index}>
                                            {unit[i].contentId[index] === null ? <></> :
                                                <div id='content'>
                                                    <div onClick={() => selectContent(id)}>
                                                        <Typography id='contentTitle'>
                                                            {unit[i].contentTitle[index]}
                                                        </Typography>

                                                        <Typography id='contentDescription'>
                                                            {unit[i].contentDescription[index]}
                                                        </Typography>
                                                    </div>
                                                    <div id='deleteIcon'>
                                                        <IconButton onClick={() => deleteContent({ contentId: id, unitId: lesson.unitId, lessonId: lesson.lessonId })}>
                                                            <DeleteForeverIcon sx={{ color: 'white' }} />
                                                        </IconButton>
                                                    </div>
                                                </ div>
                                            }
                                        </div>
                                    );
                                })}


                                {lesson.lessonName ?
                                    <div id='lessonBottom'>
                                        <Button onClick={() => {
                                            dispatch({
                                                type: "SET_SHOW_ADD_CONTENT",
                                                payload: true,
                                            });
                                            setSelectedId(lesson.lessonId);
                                        }}>
                                            Add Content to {lesson.lessonName}
                                        </Button>
                                        <IconButton onClick={() => deleteLesson({ lessonId: lesson.lessonId, unitId: lesson.unitId })}>
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </ div>
                                    : <></>}
                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })}
            <AddContentForm selectedId={selectedId} />

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

    );
}

export default UnitPage;