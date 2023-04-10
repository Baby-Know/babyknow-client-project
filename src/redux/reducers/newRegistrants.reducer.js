const newRegistrantsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_NEW_REGISTRANTS":
      return action.payload;
    default:
      return state;
  }
};

export default newRegistrantsReducer;
