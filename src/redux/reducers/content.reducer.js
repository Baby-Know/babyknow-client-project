const contentReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIDEO_UPLOAD':
      return action.payload;
    case 'SET_CONTENT':
      return action.payload;
    case 'SET_SURVEY_UPLOAD':
      return action.payload;
    default:
      return state;
  }
};

export default contentReducer;
