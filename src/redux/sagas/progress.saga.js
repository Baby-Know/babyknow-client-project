import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* getProgress(action) {
  try {
    let response = yield axios.get(`/api/progress/${action.payload}`);
    yield put({ type: 'SET_PROGRESS', payload: response.data });
  } catch (error) {
    console.error('Error in getting user-content', error);
  }
}

function* getStudentsUnitProgress(action) { 
  try {
    let response = yield axios.get(`/api/progress/${action.payload.studentId}/${action.payload.unitId}`);
    yield put({ type: 'SET_PROGRESS', payload: response.data });
  } catch (error) {
    console.error('Error in getting user-content', error);
  }
}


function* progressSaga() {
  yield takeLatest('GET_PROGRESS', getProgress);
  yield takeLatest('GET_STUDENTS_UNIT_PROGRESS', getStudentsUnitProgress);
}

export default progressSaga;