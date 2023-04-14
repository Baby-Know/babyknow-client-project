import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// survey upload generator function
function* addContent(action) {
  try {
    yield axios.post('/api/content', action.payload);
  } catch (error) {
    console.error('error posting content', error);
  }
}

// video upload generator function
function* addContentWithUpload(action) {
  try {
    const newFile = action.payload.contentToSend.content;
    const data = new FormData(); // IMPORTANT STEP! declare FormData
    data.append('file', newFile);
    data.append('title', action.payload.contentToSend.title);
    data.append('description', action.payload.contentToSend.description);
    data.append('isSurvey', action.payload.contentToSend.isSurvey);
    data.append('isRequired', action.payload.contentToSend.isRequired);
    data.append('contentOrder', action.payload.contentToSend.contentOrder);
    data.append('lessons_id', action.payload.selectedId);

    const response = yield axios.post('/api/content/file', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    yield put({ type: 'SET_VIDEO_UPLOAD', payload: response.data });
  } catch (error) {
    console.log('error uploading video', error);
  }
}
// get content with id
function* getContent(action) {
  try {
    let response = yield axios.get(`/api/content/${action.payload}/view`);
    console.log('SAGA RESPONSE', response);
    yield put({ type: 'SET_CONTENT', payload: response.data });
  } catch (error) {
    console.error('Error getting content', error);
  }
}

// delete content from a specific lesson
function* deleteContent(action) {
  const swal = withReactContent(Swal);
  try {
    let sweet = yield swal.fire({
      title: 'Are you sure you want to delete this content?',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#D21304',
      cancelButtonColor: '#263549',
      showConfirmButton: true,
      showCancelButton: true,
    });
    if (sweet.isConfirmed) {
      yield axios.delete(
        `/api/content/${action.payload.lessonId}/${action.payload.contentId}`
      );
      yield put({ type: 'GET_UNIT', payload: action.payload.unitId });
    }
  } catch (error) {
    console.error('error deleting content', error);
  }
}

function* contentSaga() {
  yield takeLatest('ADD_CONTENT', addContent);
  yield takeLatest('ADD_CONTENT_WITH_UPLOAD', addContentWithUpload);
  yield takeLatest('GET_CONTENT', getContent);
  yield takeLatest('DELETE_CONTENT', deleteContent);
}

export default contentSaga;
