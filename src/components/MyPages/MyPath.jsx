import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function MyPathPage() {
  const user = useSelector((store) => store.user);
  const teacher = useSelector((store) => store.teacherReducer);
  const progressArrays = useSelector((store) => store.progressReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "GET_TEACHER",
      payload: user.id,
    });
    dispatch({
      type: "GET_PROGRESS",
      payload: user.id,
    });
  }, []);

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
    {
      unit[0]
        ? units.push({
            name: unit[0].name,
            progress: Math.round((completed / required) * 100),
          })
        : null;
    }
  }

  const totalProgress = Math.round((totalCompleted / totalRequired) * 100);

  return (
    <div id="pathPage">
      <h1 id="pathTitle">My Path</h1>
      <div id="pathContents">
        <div className="pathContent">
          <h2>My Details</h2>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.email}</div>
          <div>{user.organization}</div>
        </div>
        <div className="pathContent">
          <h2>My Teacher</h2>
          <div>{teacher.firstName}</div>
          <div>{teacher.lastName}</div>
          <div>{teacher.email}</div>
          <div>{teacher.organization}</div>
        </div>
        <div className="pathContent">
          <h2>My Progress</h2>

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
      </div>
    </div>
  );
}

export default MyPathPage;
