const userUnitReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_UNIT':
      return action.payload;
    default:
      return state;
  }
};

export default userUnitReducer;
