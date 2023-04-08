const conditionalForms = (
  state = {
    showUnitForm: false,
    showOrganizationForm: false,
  },
  action
) => {
  switch (action.type) {
    case "SET_SHOW_ADD_UNIT":
      return {
        ...state,
        showUnitForm: action.payload,
      };
    case "SET_SHOW_ADD_ORGANIZATION":
      return {
        ...state,
        showOrganizationForm: action.payload,
      };
    default:
      return state;
  }
};

export default conditionalForms;
