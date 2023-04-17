import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* postUserContent(action) {
  try {
    console.log('action.payload', action.payload);
    axios.post('/api/user-content', action.payload);
  } catch (error) {
    console.error('Error in posting user-content saga', error);
  }
}

function* updateComplete(action) {
  try {
    axios.put(`api/content/complete`, action.payload);
  } catch (error) {
    console.error('Error updating complete toggle', error);
  }
}

function* usersContentSaga() {
  yield takeLatest('POST_USER_CONTENT', postUserContent);
  yield takeLatest('TOGGLE_COMPLETE', updateComplete);
}

export default usersContentSaga;
