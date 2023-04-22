import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function UnitOverviewPage () {
    const dispatch = useDispatch();
    const { unitId, studentId } = useParams()
    const unit = useSelector(store => store.unit)
    const progressByLesson = useSelector(store => store.progressReducer)
    const student = useSelector(store => store.studentsReducer.studentReducer)

    useEffect(() => {
        dispatch({
            type: "GET_UNIT",
            payload: unitId
        });
        dispatch({
            type: "GET_STUDENTS_UNIT_PROGRESS",
            payload: { studentId: studentId, unitId: unitId }
        });
        dispatch({
            type: "GET_STUDENT",
            payload: studentId
        });
    }, []);

    return (
        <div id="overviewPage">
            <h2>{student.firstName} {student.lastName}</h2>
            <h1>{unit[0] ? unit[0].unitName : 'Unit' } Overview</h1>
            {unit.map((lesson, i) => {
                return (
                    <div key={i}>
                        <h2 style={{ borderBottom: '2px solid white', borderTop: '2px solid white'}}>{lesson.lessonName}</h2>

                        {lesson.contentId?.map((contentId, index) => {
                            return(
                                <div id='contentOverviewRow' key={index}>

                                    <div id='contentOverview'>
                                        
                                        <h3>{lesson.contentTitle[index]}</h3>

                                        { progressByLesson[i] === undefined ? <></> :
                                            <>
                                                {progressByLesson[i][index]?.isRequired ?
                                                    <>
                                                    {progressByLesson[i][index]?.isComplete ? 
                                                        <h3 id="required">✓</h3> :
                                                        <h3 id="required"></h3>
                                                    } 
                                                    </>:  <></>
                                                    } 
                                            </>
                                        }

                                    </div>

                                    { progressByLesson[i] === undefined ? <></> :
                                            <div>{progressByLesson[i][index]?.comment}</div>
                                    }

                                </div>
                            )
                        })}

                    </div>
                )
            })}
        </div>
    )
}

export default UnitOverviewPage