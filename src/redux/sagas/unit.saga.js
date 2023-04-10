import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function* getUnits() {
  try {
    let response = yield axios.get("/api/unit");
    yield put({ type: "SET_UNITS", payload: response.data });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* deleteUnit(action) {
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
      yield axios.delete(`/api/unit/${action.payload}`);
      yield put({ type: "GET_UNITS" });
    }
  } catch (error) {
    console.error("Error deleting unit", error);
  }
}

function* updateUnit(action) {
  try {
    yield axios.put(`/api/unit/${action.payload.id}`, action.payload);
    yield put({ type: "GET_UNITS" });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* unitSaga() {
  yield takeLatest("GET_UNITS", getUnits);
  yield takeLatest("DELETE_UNIT", deleteUnit);
  yield takeLatest("UPDATE_UNIT", updateUnit);
}

export default unitSaga;
