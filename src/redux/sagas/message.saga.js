import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


function* postRoom(action){
    try {
    const response = yield axios.post('/', action.payload);
    console.log('room posted', action.payload)
    yield put({type: 'GET_ROOM', payload: response.data})
    } catch (error) {
        console.log('error posting room', error)
    }
}

function* postMessage(action) {
    try {
        const response = yield axios.post('/', action.payload);
        console.log('post message payload', action.payload)
        yield put({type: 'GET_MESSAGE', payload: response.data})
    } catch (error) {
        console.log('error posting message', error)  
    }
}

function*  getMessage() {
    try {
        const message = yield axios.get('/');
        yield put({type: 'SET_MESSAGE', payload: message.data})
    } catch (error) {
        console.log('error getting message', error)  
    }
}

function* getRoom(){
 try {
    const response = yield axios.get('/');
    yield put({type: 'SET_ROOM', payload: response.data})
 } catch (error) {
    console.log('error getting room', error)  
 }
}


function* messageSaga() {
    yield takeLatest('POST_MESSAGE', postMessage);
    yield takeLatest('GET_MESSAGE', getMessage);

    yield takeLatest('POST_ROOM', getRoom);
    yield takeLatest('GET_ROOM', getRoom);


}

export default messageSaga;