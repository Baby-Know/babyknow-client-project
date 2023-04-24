import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function OverviewPage () {
    const dispatch = useDispatch()
    const history = useHistory()
    const { studentId } = useParams()
    const progressArrays = useSelector((store) => store.progressReducer);
    const student = useSelector((store) => store.studentsReducer.studentReducer);
    console.log('progressA: ', progressArrays)

    let totalCompleted = 0;
    let totalRequired = 0;
    let units = [];
  
    for (let unit of progressArrays) {
      let completed = 0;
      let required = 0;
  
      for (let content of unit) {
        if (content.isComplete) {
          completed++;
          totalCompleted++;
        }
        required++;
        totalRequired++;
      }
      {unit[0] ? units.unshift({ id: unit[0].id, name: unit[0].name, progress: Math.round((completed / required) * 100)}) : null}
    }

    const totalProgress = Math.round((totalCompleted / totalRequired) * 100);


    useEffect(() => {
        dispatch({
            type: "GET_PROGRESS",
            payload: studentId,
        });
        dispatch({
            type: "GET_STUDENT",
            payload: studentId,
        });
    }, []);

    return (
        <div id="overviewPage">
            <h2>{student.firstName} {student.lastName}</h2>
            <h1 style={{borderBottom : '2px solid white', width:'30%', margin:'auto', marginTop:'4%'}}>Overview Page</h1>
                {units.map((unit, i) => {
                    return (
                    <div style={{ cursor:'pointer', display:'flex', justifyContent:'space-around' }} onClick={() => history.push(`/unitOverview/${unit.id}/${studentId}`)} key={i}>
                        <h3>{unit.name}</h3>
                        <div>{unit.progress} % </div>
                    </div>
                    );
                })}

            <h3>Total Progress</h3>
            <div>{totalProgress} %</div>
        </div>
    )
}

export default OverviewPage