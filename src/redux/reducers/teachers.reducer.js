const teacherReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_TEACHERS":
      return action.payload;
    case "SET_TEACHER":
      return action.payload;
    default:
      return state;
  }
};

export default teacherReducer;
