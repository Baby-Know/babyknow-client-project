
import { combineReducers } from "redux";

const messages = (state = [], action) => {
    switch(action.type) {
        case 'SET_MESSAGE':
            return action.payload;
        default:
            return state;
    }
}

const rooms = (state = [], action) => {
    switch(action.type) {
        case 'SET_ROOM':
            return action.payload;
        default:
            return state;
    }
}

const messageReducer = combineReducers({
    messages,
    rooms
})


export default messageReducer;