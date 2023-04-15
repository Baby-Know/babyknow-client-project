import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function* deleteLesson (action) {
    const swal = withReactContent(Swal);
    try {
    let sweet = yield swal.fire({
      title: "Are you sure you want to delete this lesson?",
      confirmButtonText: "Delete",
      confirmButtonColor: "#D21304",
      cancelButtonColor: "#263549",
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (sweet.isConfirmed) {
      yield axios.delete(`/api/lesson/${action.payload.lessonId}`);
      yield put({ type: "GET_UNIT", payload: action.payload.unitId });
    }
  } catch (error) {
    console.error("Error deleting unit", error);
  }
}

function* updateLesson(action) {
  try {
    yield axios.put(`/api/lesson`, action.payload.lessonToEdit);
    yield put({ type: "GET_UNIT", payload: action.payload.ids.unitId });
  } catch (error) {
    console.error("Error updating lesson", error);
  }
}

function* lessonSaga() {
    yield takeLatest("DELETE_LESSON", deleteLesson);
    yield takeLatest("UPDATE_LESSON", updateLesson);
}

export default lessonSaga