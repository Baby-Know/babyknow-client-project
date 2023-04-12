import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// function* getContent(){
//     try{
//         const response = yield axios.get('/api/content')
//         yield put({type: 'SET_CONTENT', payload:response.data})
//     } catch(error) {
//         console.error('Error getting content', error);
//     }
// }

function* addContent(action) {
    try {
        yield axios.post('/api/content', action.payload);

        if (action.callback) {
            action.callback({
                content: "",
                title: "",
                description: "",
                contentOrder: "",
                isRequired: false
            })
        }
    } catch (error) {
        console.error('error posting content', error)

    }
}

function* uploadVideo(action) {
    try {
      const newFile = action.payload.file;
      const data = new FormData(); // IMPORTANT STEP! declare FormData
      data.append('file', newFile) 
      
      yield console.log('here is the data!', data);
      const response = yield axios.put('/api/content/files', data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
      });
      yield put({type: 'SET_VIDEO_UPLOAD', payload: response.data})
    } catch (error) {
        console.log('error uploading video', error)
    }
}


function* contentSaga() {
    yield takeLatest("ADD_CONTENT", addContent);
    yield takeLatest("UPLOAD_VIDEO", uploadVideo);
    // yield takeLatest("GET_CONTENT", getContent);
}

export default contentSaga;