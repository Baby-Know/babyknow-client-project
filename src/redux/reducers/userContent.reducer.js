const userContentReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_CONTENT':
      return action.payload;
    default:
      return state;
  }
};

export default userContentReducer;
