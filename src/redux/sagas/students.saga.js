import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function* getStudents() {
  try {
    let response = yield axios.get("/api/students");
    yield put({ type: "SET_STUDENTS", payload: response.data });
  } catch (error) {
    console.error("Error getting students", error);
  }
}

function* studentsSaga() {
  yield takeLatest("FETCH_STUDENTS", getStudents);
}

export default studentsSaga;
