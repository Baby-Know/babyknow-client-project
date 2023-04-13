const contentReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_VIDEO_UPLOAD':
            return action.payload;
        default:
            return state;
    }
}

export default contentReducer;