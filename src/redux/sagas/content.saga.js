import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";


// survey upload generator function
function* addContent(action) {
    try {
        yield axios.post('/api/content', action.payload);

    } catch (error) {
        console.error('error posting content', error)

    }
}

// video upload generator function
function* addContentWithUpload(action) {
    try {
    console.log('action.payload.contentToSend.content', action.payload.contentToSend.content)
    console.log('action.payload', action.payload.contentToSend)

      const newFile = action.payload.contentToSend.content;
      const data = new FormData(); // IMPORTANT STEP! declare FormData
      data.append('file', newFile) 
      data.append('title', action.payload.contentToSend.title)
      data.append('description', action.payload.contentToSend.description)
      data.append('isSurvey', action.payload.contentToSend.isSurvey)
      data.append('isRequired', action.payload.contentToSend.isRequired)
      data.append('contentOrder', action.payload.contentOrder.contentOrder)

      //posting to AWS
      yield console.log('here is the data!', data);
      const response = yield axios.post('/api/content', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
      });   
      yield put({type: 'SET_VIDEO_UPLOAD', payload: response.data})
    } catch (error) {
        console.log('error uploading video', error)
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
    yield takeLatest("ADD_CONTENT_WITH_UPLOAD", addContentWithUpload);
    yield takeLatest("GET_CONTENT", getContent);
}

export default contentSaga;