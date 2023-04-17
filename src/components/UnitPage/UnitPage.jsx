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
    Typography
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddLessonForm from './AddLessonForm/AddLessonForm';
import AddContentForm from './AddContentForm/AddContentForm';
import LoadingBar from '../LoadingBar/LoadingBar';
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

function UnitPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const unit = useSelector(store => store.unit);
    const user = useSelector(store => store.user);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedId, setSelectedId] = useState(0);
    const [selectedUnitId, setSelectedUnitId] = useState(0);

    const isLoading = useSelector((store) => store.loadingReducer);

    const [lessonToEdit, setLessonToEdit] = useState({ id: 0, lessonName: '', lessonDescription: '' });
    const [contentToEdit, setContentToEdit] = useState({ id: 0, contentName: '', contentDescription: '' });
    const [lessonToSwap, setLessonToSwap] = useState({ lessonId: 0, order: 0 });
    const [contentToSwap, setContentToSwap] = useState({ contentId: 0, lessonId: 0, order: 0 });
    const [swappingContent, setSwappingContent] = useState(false);

    useEffect(() => {
        dispatch({
            type: "GET_UNIT",
            payload: id
        });
    }, []);

    const selectContent = (unitId, lessonId, contentId) => {
        // const userContent = { userId: user.id, contentId: contentId, isComplete: false, media: '', comment: '' };
        // dispatch({
        //     type: "POST_USER_CONTENT",
        //     payload: { userContent }
        // });
        // console.log('Post userContent unit page', userContent);
        history.push({
            pathname: `/unit/${unitId}/lesson/${lessonId}/content/${contentId}`
        });
    };

    const editLesson = (ids) => {
        dispatch({
            type: "UPDATE_LESSON",
            payload: { ids, lessonToEdit }
        });

        setLessonToEdit({ id: 0, lessonName: '', lessonDescription: '' });
    };

    const editContent = (ids) => {
        dispatch({
            type: "UPDATE_CONTENT",
            payload: { ids, contentToEdit }
        });

        setContentToEdit({ id: 0, contentName: '', contentDescription: '' });
    };

    const cancelEdit = () => {
        setLessonToEdit({ id: 0, lessonName: '', lessonDescription: '' });
        setContentToEdit({ id: 0, contentName: '', contentDescription: '' });
    };

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

    const swapLessons = (otherLessonToSwap) => {
        if (!swappingContent) {
            console.log('swap');
            dispatch({
                type: "SWAP_LESSONS",
                payload: { lessonId: lessonToSwap.lessonId, order: otherLessonToSwap.order, unitId: otherLessonToSwap.unitId }
            });

            dispatch({
                type: "SWAP_LESSONS",
                payload: { lessonId: otherLessonToSwap.lessonId, order: lessonToSwap.order, unitId: otherLessonToSwap.unitId }
            });
        } else console.log('nothing');
    };

    const swapContent = (otherContentToSwap) => {
        if (swappingContent) {
            console.log('swap: ', contentToSwap, otherContentToSwap);
            dispatch({
                type: "SWAP_CONTENT",
                payload: { contentId: contentToSwap.contentId, order: otherContentToSwap.order, lessonId: otherContentToSwap.lessonId, unitId: otherContentToSwap.unitId }
            });

            dispatch({
                type: "SWAP_CONTENT",
                payload: { contentId: otherContentToSwap.contentId, order: contentToSwap.order, lessonId: contentToSwap.lessonId, unitId: otherContentToSwap.unitId }
            });
        } else console.log('nothing');
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
                    //conditionally rendering open or closed
                    <div key={i}>
                        {i === 0 ?
                            <Card id='unitHeader'>
                                <h1 style={{ fontWeight: 'bold', fontSize: 24, textDecoration: 'underline' }}
                                >{lesson.unitName}</h1>
                                <h2>{lesson.unitSubtitle}</h2>
                            </Card>
                            : <></>}

                        <Accordion id="accordion" >
                            <AccordionSummary
                                draggable={user.access === 3 ? 'true' : 'false'}
                                onDragStart={() => {
                                    setLessonToSwap({ lessonId: lesson.lessonId, order: lesson.lessonOrder });
                                    setSwappingContent(false);
                                }}
                                onDragOver={(event) => event.preventDefault()}
                                onDrop={() => swapLessons({ lessonId: lesson.lessonId, order: lesson.lessonOrder, unitId: lesson.unitId })}
                                expandIcon={<ExpandMoreIcon />}
                            >
                                {/* lesson title */}
                                {lesson.lessonId !== lessonToEdit.id ?
                                    <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                                        {lesson.lessonName}
                                    </Typography> :
                                    <input
                                        onChange={(event) => setLessonToEdit({ ...lessonToEdit, lessonName: event.target.value })}
                                        className='lessonInputs' placeholder='lesson name' value={lessonToEdit.lessonName}
                                    />
                                }

                            </AccordionSummary>
                            <AccordionDetails>
                                {/* lesson description */}
                                {lesson.lessonId !== lessonToEdit.id ?
                                    <Typography>
                                        {lesson.lessonDescription}
                                    </Typography> :
                                    <input onChange={(event) => setLessonToEdit({ ...lessonToEdit, lessonDescription: event.target.value })} className='lessonInputs' placeholder='lesson description' value={lessonToEdit.lessonDescription} />
                                }


                                {unit[i].contentId?.map((id, index) => {
                                    return (
                                        <div key={index} >
                                            {unit[i].contentId[index] === null ? <></> :
                                                <div id='content'
                                                    draggable={user.access === 3 ? 'true' : 'false'}
                                                    onDragStart={() => {
                                                        setContentToSwap({ contentId: id, lessonId: lesson.lessonId, order: unit[i].contentOrder[index] });
                                                        setSwappingContent(true);
                                                    }}
                                                    onDragOver={(event) => event.preventDefault()}
                                                    onDrop={() => swapContent({ contentId: id, order: unit[i].contentOrder[index], lessonId: lesson.lessonId, unitId: lesson.unitId })}
                                                >
                                                    {/* content shown on screen */}
                                                    {id !== contentToEdit.id ?
                                                        <div onClick={() => selectContent(lesson.unitId, lesson.lessonId, id)}>
                                                            <Typography id='contentTitle'>
                                                                {unit[i].contentTitle[index]}
                                                            </Typography>

                                                            {/* do we want? */}
                                                            {/* <Typography id='contentDescription'>
                                                    {unit[i].contentDescription[index]}
                                                </Typography> */}
                                                        </div> :
                                                        <>
                                                            <div><input onChange={(event) => setContentToEdit({ ...contentToEdit, contentName: event.target.value })} className='lessonInputs' placeholder='content name' value={contentToEdit.contentName} /></div>
                                                            <div><input onChange={(event) => setContentToEdit({ ...contentToEdit, contentDescription: event.target.value })} className='lessonInputs' placeholder='content description' value={contentToEdit.contentDescription} /></div>
                                                        </>
                                                    }

                                                    {/* icons for content */}
                                                    {user.access === 3 ?
                                                        <div id='contentIcons'>
                                                            {id !== contentToEdit.id ?
                                                                <>
                                                                    <IconButton onClick={() => setContentToEdit({ id: id, contentName: lesson.contentTitle[index], contentDescription: lesson.contentDescription[index] })}>
                                                                        <EditIcon sx={{ color: 'white' }} />
                                                                    </IconButton>
                                                                    <IconButton onClick={() => deleteContent({ contentId: id, unitId: lesson.unitId })}>
                                                                        <DeleteForeverIcon sx={{ color: 'white' }} />
                                                                    </IconButton>
                                                                </> :
                                                                <>
                                                                    <IconButton onClick={() => editContent({ contentId: id, unitId: lesson.unitId })}>
                                                                        <DoneIcon sx={{ color: 'white' }} />
                                                                    </IconButton>
                                                                    <IconButton onClick={cancelEdit} >
                                                                        <ClearIcon sx={{ color: 'white' }} />
                                                                    </IconButton>
                                                                </>
                                                            }
                                                        </div> : <></>}

                                                </ div>
                                            }
                                        </div>
                                    );
                                })}

                                {lesson.lessonName && user.access === 3 ?
                                    <div id='lessonBottom'>
                                        <Button onClick={() => {
                                            dispatch({
                                                type: "SET_SHOW_ADD_CONTENT",
                                                payload: true,
                                            });
                                            setSelectedId(lesson.lessonId);
                                            setSelectedUnitId(lesson.unitId);
                                        }}>
                                            Add Content to {lesson.lessonName}
                                        </Button>
                                        <div>
                                            {/* lesson icons */}
                                            {lesson.lessonId !== lessonToEdit.id ?
                                                <>
                                                    <IconButton onClick={() => setLessonToEdit({ id: lesson.lessonId, lessonName: lesson.lessonName, lessonDescription: lesson.lessonDescription })}>
                                                        <EditIcon sx={{ color: '#276184' }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteLesson({ lessonId: lesson.lessonId, unitId: lesson.unitId })}>
                                                        <DeleteForeverIcon sx={{ color: '#276184' }} />
                                                    </IconButton>
                                                </> :
                                                <>
                                                    <IconButton onClick={() => editLesson({ lessonId: lesson.lessonId, unitId: lesson.unitId })}>
                                                        <DoneIcon sx={{ color: '#276184' }} />
                                                    </IconButton>
                                                    <IconButton onClick={cancelEdit} >
                                                        <ClearIcon sx={{ color: '#276184' }} />
                                                    </IconButton>
                                                </>
                                            }
                                        </div>
                                    </ div>
                                    : <></>}
                            </AccordionDetails>
                        </Accordion>
                    </div>
                );
            })}

            {isLoading ?
                <LoadingBar />
                :
                <AddContentForm selectedId={selectedId} selectedUnitId={selectedUnitId} />
            }

            <div id="addLessonParent">
                {user.access === 3 ?
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
                    </Button> : <></>}
            </div>
        </Box>

    );
}

export default UnitPage;