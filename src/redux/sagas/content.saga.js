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

function* contentSaga() {
    yield takeLatest("ADD_CONTENT", addContent);
    // yield takeLatest("GET_CONTENT", getContent);
}

export default contentSaga;