import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* fetchUserUnit(action) {
  try {
    let response = yield axios.get(`api/user-unit`, action.payload);
    yield put({ type: 'SET_USER_UNIT', payload: response.data });
  } catch (error) {
    console.error('Error in getting user-unit', error);
  }
}

function* userUnitSaga() {
  yield takeLatest('FETCH_USER_UNIT', fetchUserUnit);
}

export default userUnitSaga;
