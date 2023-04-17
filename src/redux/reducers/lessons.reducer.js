const lessonsReducer = (state = 0, action) => {
    switch (action.type) {
      case "SELECTED_LESSON_ID":
        return action.payload;
      default:
        return state;
    }
  };

  export default lessonsReducer;
