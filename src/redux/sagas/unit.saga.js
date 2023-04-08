import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

// get units
function* getUnits() {
    try{
        let response = yield axios.get('/api/unit');
        yield put ({type: 'SET_UNITS', payload: response.data})
    }catch(error) {
        console.error('Error getting unit', error);
    }
}

function* unitSaga() {
    yield takeLatest('GET_UNITS', getUnits);
}

export default unitSaga;