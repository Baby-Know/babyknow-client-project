import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";

function MyTeacherPage () {
    const user = useSelector(store => store.user);
    const teacher = useSelector(store => store.teacherReducer);
    const dispatch = useDispatch()

    console.log(teacher)


    useEffect(() => {
        dispatch({
            type: "GET_TEACHER",
            payload: user.id
        });
    }, []);

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
                    <div>unit progression</div>
                    <div>unit progression</div>
                    <div>unit progression</div>
                    <div>total progression</div>
            </div>
        </div>
    </div>
    )
}

export default MyTeacherPage