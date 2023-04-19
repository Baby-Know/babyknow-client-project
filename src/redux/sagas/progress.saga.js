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


function* progressSaga() {
  yield takeLatest('GET_PROGRESS', getProgress);
}

export default progressSaga;