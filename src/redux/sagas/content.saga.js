import axios from "axios";
import { takeLatest } from "redux-saga/effects";


function* addContent(action) {
    try {
        yield axios.post('/api/content', action.payload);

        // if (action.callback) {
        //     action.callback({
        //         content: "",
        //         title: "",
        //         description: "",
        //         contentOrder: "",
        //         isRequired: false
        //     })
        // }
    } catch (error) {
        console.error('error posting content', error)

    }
}


function* contentSaga() {
    yield takeLatest("ADD_CONTENT", addContent);
}

export default contentSaga;