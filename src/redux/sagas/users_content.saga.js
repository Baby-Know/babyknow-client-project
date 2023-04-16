import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

function* updateComplete(action) {
    try {
      axios.put(`api/content/complete`, action.payload);
    } catch (error) {
      console.error('Error updating complete toggle', error);
    }
  }
  
  function* usersContentSaga() {
    yield takeLatest('TOGGLE_COMPLETE', updateComplete);
  }
  
  export default usersContentSaga;