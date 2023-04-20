import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, TextField } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory } from "react-router-dom";



function MyStudentsPage () {
    const user = useSelector(store => store.user)
    const myStudents = useSelector(store => store.studentsReducer.studentsByTeacherReducer)
    const allStudents = useSelector(store => store.studentsReducer.allStudentsReducer.students)
    const dispatch = useDispatch()
    const history = useHistory()
    const [studentIdToAdd, setStudentIdToAdd] = useState({name: '', studentId: 0})

    useEffect(() => {
        dispatch({
            type: "GET_STUDENTS_BY_TEACHER",
            payload: user.id
        });
        dispatch({
            type: "FETCH_STUDENTS"
        });
    }, []);

    const addStudent = () => {
        dispatch({
            type: "UPDATE_STUDENT_COHORT",
            payload: {studentId: studentIdToAdd, teacherId: user.id }
        });
    }

    const selectStudent = (id) => {
        history.push(`/overview/${id}`)
    }

    // finds students that are not already in teachers cohort
    const notMyStudents = allStudents?.filter((student, i) => {
        return !myStudents.some((myStudent, i) => student.id === myStudent.id)
    })

    // pushes students into an array to fit requirements of AutoComplete
    const selectableStudents = notMyStudents?.map((student,i) => { 
        return {label: `${student.firstName} ${student.lastName}`, studentId: student.id}
    })

    return (

        <div id="myStudentsPage">
            <h1 id="myStudentsTitle">My Students</h1>

            {myStudents[0]? <h2>{myStudents[0].cohort} Students</h2> : <h2>Students</h2>}

            {myStudents?.map((student, i) => {
                return (
                    <div id="studentListRow" onClick={() => selectStudent(student.id)} style={{ cursor:'pointer'}} key={i}>
                        <h3>{student.firstName} {student.lastName}</h3>
                        <h3>{student.email}</h3>
                    </div>
                )
            })}

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                // bruh what tf is this
                isOptionEqualToValue={(option, value) => option.id === value.id}    
                onChange={(event, newValue) => setStudentIdToAdd(newValue.studentId)}
                options={selectableStudents || []}
                sx={{ margin:'auto', width: 300, backgroundColor:'white' }}
                renderInput={(params) => <TextField {...params} label="Search Students" variant="standard" />}
            />
            <div><Button sx={{backgroundColor: 'white', border: '2px solid black'}} onClick={addStudent}>Add Student</Button></div>

        </div>
    )
}

export default MyStudentsPage