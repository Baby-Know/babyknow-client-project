const progressReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_PROGRESS":
        return  action.payload;
      default:
        return state;
    }
  };
  
  export default progressReducer;