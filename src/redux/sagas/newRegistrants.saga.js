import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function* getNewRegistrants() {
  try {
    let response = yield axios.get("/api/newRegistrants");
    yield put({ type: "SET_NEW_REGISTRANTS", payload: response.data });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* deleteNewRegistrant(action) {
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
      yield axios.delete(`/api/newRegistrants/${action.payload}`);
      yield put({ type: "FETCH_NEW_REGISTRANTS" });
    }
  } catch (error) {
    console.error("Error deleting unit", error);
  }
}

function* updateNewRegistrant(action) {
  try {
    yield axios.put(`/api/newRegistrants/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_NEW_REGISTRANTS" });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* newRegistrantsSaga() {
  yield takeLatest("FETCH_NEW_REGISTRANTS", getNewRegistrants);
  yield takeLatest("DELETE_NEW_REGISTRANT", deleteNewRegistrant);
  yield takeLatest("UPDATE_NEW_REGISTRANT", updateNewRegistrant);
}

export default newRegistrantsSaga;
