import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function* fetchStudents() {
  try {
    let response = yield axios.get("/api/students");
    yield put({ type: "SET_STUDENTS", payload: response.data });
  } catch (error) {
    console.error("Error getting students", error);
  }
}

function* updateStudent(action) {
  try {
    yield axios.put(`/api/students/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_STUDENTS" });
  } catch (error) {
    console.error("Error updating student", error);
  }
}

function* deleteStudent(action) {
  const swal = withReactContent(Swal);
  try {
    let sweet = yield swal.fire({
      title: "Are you sure you want to delete this unit?",
      confirmButtonText: "Delete",
      confirmButtonColor: "#D21304",
      cancelButtonColor: "#263549",
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (sweet.isConfirmed) {
      yield axios.delete(`/api/students/${action.payload}`);
      yield put({ type: "FETCH_STUDENTS" });
    }
  } catch (error) {
    console.error("Error deleting unit", error);
  }
}

function* getStudentsByTeacher(action) {
  try {
    let response = yield axios.get(`/api/students/${action.payload}`);
    yield put({ type: "SET_STUDENTS_BY_TEACHER", payload: response.data });
  } catch (error) {
    console.error("Error getting students", error);
  }
}

function* updateStudentCohort(action) {
  try {
    yield axios.put(`/api/students`, action.payload);
    yield put({ type: "GET_STUDENTS_BY_TEACHER", payload: action.payload.teacherId });
  } catch (error) {
    console.error("Error getting students", error);
  }
}

function* studentsSaga() {
  yield takeLatest("FETCH_STUDENTS", fetchStudents);
  yield takeLatest("UPDATE_STUDENT", updateStudent);
  yield takeLatest("DELETE_STUDENT", deleteStudent);
  yield takeLatest("GET_STUDENTS_BY_TEACHER", getStudentsByTeacher);
  yield takeLatest("UPDATE_STUDENT_COHORT", updateStudentCohort);
}

export default studentsSaga;
