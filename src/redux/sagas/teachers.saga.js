import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchTeachers() {
  try {
    let response = yield axios.get("/api/teachers");
    yield put({ type: "SET_TEACHERS", payload: response.data });
  } catch (error) {
    console.error("Error getting teachers", error);
  }
}

function* teachersSaga() {
  yield takeLatest("FETCH_TEACHERS", fetchTeachers);
}

export default teachersSaga;
