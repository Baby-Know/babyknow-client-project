const conditionalForms = (
  state = {
    showUnitForm: false,
    showLessonForm: false,
    showContentForm: false,
  },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_ADD_UNIT":
      return {
        ...state,
        showUnitForm: action.payload,
      };
    case "SET_SHOW_ADD_LESSON":
      return {
        ...state,
        showLessonForm: action.payload,
      };
    case "SET_SHOW_ADD_CONTENT":
      return {
        ...state,
        showContentForm: action.payload,
      };
    default:
      return state;
  }
};

export default conditionalForms;
