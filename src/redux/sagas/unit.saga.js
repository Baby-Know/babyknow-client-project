import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* getUnits() {
    try{
        let response = yield axios.get('/api/unit');
        yield put ({type: 'SET_UNITS', payload: response.data})
    }catch(error) {
        console.error('Error getting unit', error);
    }
}

function* deleteUnit(action) {
    try{
        yield axios.delete(`/api/unit/${action.payload}`);
        yield put ({type: 'GET_UNITS'})
    }catch(error) {
        console.error('Error deleting unit', error);
    }
}

function* unitSaga() {
    yield takeLatest('GET_UNITS', getUnits);
    yield takeLatest('DELETE_UNIT', deleteUnit);
}

export default unitSaga;