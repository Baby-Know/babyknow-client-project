import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getNewRegistrants() {
  try {
    let response = yield axios.get("/api/newRegistrants");
    yield put({ type: "SET_NEW_REGISTRANTS", payload: response.data });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* newRegistrantsSaga() {
  yield takeLatest("FETCH_NEW_REGISTRANTS", getNewRegistrants);
}

export default newRegistrantsSaga;
