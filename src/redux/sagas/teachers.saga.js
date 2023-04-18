import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function* fetchTeachers() {
  try {
    let response = yield axios.get("/api/teachers");
    yield put({ type: "SET_TEACHERS", payload: response.data });
  } catch (error) {
    console.error("Error getting teachers", error);
  }
}

function* deleteTeacher(action) {
  const swal = withReactContent(Swal);
  try {
    let sweet = yield swal.fire({
      title: "Are you sure you want to delete this registrant?",
      confirmButtonText: "Delete",
      confirmButtonColor: "#D21304",
      cancelButtonColor: "#263549",
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (sweet.isConfirmed) {
      yield axios.delete(
        `/api/teachers/${action.payload.id}/${action.payload.cohortId}`
      );
      yield put({ type: "FETCH_TEACHERS" });
    }
  } catch (error) {
    console.error("Error deleting unit", error);
  }
}

function* updateTeacher(action) {
  try {
    yield axios.put(`/api/teachers/${action.payload.userId}`, action.payload);
    yield put({ type: "FETCH_TEACHERS" });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* teachersSaga() {
  yield takeLatest("FETCH_TEACHERS", fetchTeachers);
  yield takeLatest("DELETE_TEACHER", deleteTeacher);
  yield takeLatest("UPDATE_TEACHER", updateTeacher);
}

export default teachersSaga;
