import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";


function* addContent(action) {
    try {
        yield axios.post('/api/content', action.payload);

    } catch (error) {
        console.error('error posting content', error)

    }
}

// get content with id
function* getContent(action) {
    try {
      let response = yield axios.get(`/api/content/${action.payload}`);
      console.log('RESPONSE IS', response.data)
      yield put({ type: "SET_CONTENT", payload: response.data });
    } catch (error) {
      console.error("Error getting content", error);
    }
  }
  


function* contentSaga() {
    yield takeLatest("ADD_CONTENT", addContent);
    yield takeLatest("GET_CONTENT", getContent);
}

export default contentSaga;