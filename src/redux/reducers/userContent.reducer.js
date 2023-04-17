const userContentReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPLETE':
      return action.payload;
    default:
      return state;
  }
};

export default userContentReducer;
