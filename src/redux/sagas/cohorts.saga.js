import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function* fetchCohorts() {
  try {
    let response = yield axios.get("/api/cohort");
    yield put({ type: "SET_COHORTS", payload: response.data });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* deleteCohort(action) {
  const swal = withReactContent(Swal);
  try {
    let sweet = yield swal.fire({
      title: "Are you sure you want to delete this cohort?",
      confirmButtonText: "Delete",
      confirmButtonColor: "#D21304",
      cancelButtonColor: "#263549",
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (sweet.isConfirmed) {
      yield axios.delete(`/api/cohort/${action.payload}`);
      yield put({ type: "FETCH_COHORTS" });
    }
  } catch (error) {
    console.error("Error deleting cohort", error);
  }
}

function* updateCohort(action) {
  try {
    yield axios.put(`/api/cohort/${action.payload.id}`, action.payload);
    yield put({ type: "FETCH_COHORTS" });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* addCohort(action) {
  try {
    yield axios.post(`/api/cohort/`, action.payload);
    yield put({ type: "FETCH_COHORTS" });
  } catch (error) {
    console.error("Error getting unit", error);
  }
}

function* cohortsSaga() {
  yield takeLatest("FETCH_COHORTS", fetchCohorts);
  yield takeLatest("DELETE_COHORT", deleteCohort);
  yield takeLatest("UPDATE_COHORT", updateCohort);
  yield takeLatest("ADD_COHORT", addCohort);
}

export default cohortsSaga;
