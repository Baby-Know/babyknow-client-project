const conditionalForms = (
  state = {
    showUnitForm: false,
    showCohortForm: false,
  },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_ADD_UNIT":
      return {
        ...state,
        showUnitForm: action.payload,
      };
    case "SET_SHOW_ADD_COHORT":
      return {
        ...state,
        showCohortForm: action.payload,
      };
    default:
      return state;
  }
};

export default conditionalForms;
