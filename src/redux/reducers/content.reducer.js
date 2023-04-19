const contentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CONTENT_VIEW':
      return action.payload;
    default:
      return state;
  }
};

export default contentReducer;
