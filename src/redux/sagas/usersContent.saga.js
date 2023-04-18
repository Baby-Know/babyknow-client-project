import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchUserContent(action) {
  try {
    console.log('action.payload', [], action.payload);
    let response = yield axios.get(
      `/api/user-content/${action.payload.userId}/${action.payload.contentId}`
    );
    console.log('saga fetch response.data', response.data);
    yield put({ type: 'SET_USER_CONTENT', payload: response.data });
  } catch (error) {
    console.error('Error in getting user-content', error);
  }
}

function* postUserComment(action) {
  try {
    yield axios.put('/api/user-content', action.payload);
    yield put({ type: 'FETCH_USER_CONTENT', payload: action.payload });
  } catch (error) {
    console.error('Error in submitting user comment saga', error);
  }
}

function* updateComplete(action) {
  try {
    yield axios.put(`api/user-content`, action.payload);
    yield put({ type: 'FETCH_USER_CONTENT', payload: action.payload });
  } catch (error) {
    console.error('Error updating complete toggle', error);
  }
}

function* usersContentSaga() {
  yield takeLatest('FETCH_USER_CONTENT', fetchUserContent);
  yield takeLatest('POST_COMMENT', postUserComment);
  yield takeLatest('TOGGLE_COMPLETE', updateComplete);
}

export default usersContentSaga;
