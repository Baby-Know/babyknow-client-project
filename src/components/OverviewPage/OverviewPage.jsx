import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function OverviewPage () {
    const dispatch = useDispatch()
    const { studentId } = useParams()
    const progressArrays = useSelector((store) => store.progressReducer);

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
      {unit[0] ? units.push({ name: unit[0].name, progress: Math.round((completed / required) * 100)}) : null}
    }

    const totalProgress = Math.round((totalCompleted / totalRequired) * 100);


    useEffect(() => {
        dispatch({
            type: "GET_PROGRESS",
            payload: studentId,
        });
    }, []);

    return (
        <div id="overviewPage">
            <h1>Overview Page</h1>
                {units.map((unit, i) => {
                    return (
                    <div key={i}>
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