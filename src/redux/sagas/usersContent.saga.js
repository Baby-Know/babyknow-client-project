import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

// function* fetchUserContent(action) {
//   try {
//     let response = yield axios.get('/api/user-content', action.payload);
//     console.log('saga fetch response', response);
//     yield put({ type: 'SET_USER_CONTENT', payload: response.data });
//   } catch (error) {
//     console.error('Error in getting user-content', error);
//   }
// }

// function* postUserContent(action) {
//   try {
//     axios.post('/api/user-content', action.payload);
//   } catch (error) {
//     console.error('Error in posting user-content saga', error);
//   }
// }

// function* updateComplete(action) {
//   try {
//     axios.put(`api/content/complete`, action.payload);
//   } catch (error) {
//     console.error('Error updating complete toggle', error);
//   }
// }

function* usersContentSaga() {
  // yield takeLatest('FETCH_USER_CONTENT', fetchUserContent);
  // yield takeLatest('POST_USER_CONTENT', postUserContent);
  // yield takeLatest('TOGGLE_COMPLETE', updateComplete);
}

export default usersContentSaga;
