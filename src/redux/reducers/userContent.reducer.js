const userContentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_CONTENT':
      console.log('reducer', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default userContentReducer;
