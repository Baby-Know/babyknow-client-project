import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import unit from "./unit.reducer";
import contentReducer from "./content.reducer";
import conditionalForms from "./conditionalForms";
import newRegistrantsReducer from "./newRegistrants.reducer";
import studentsReducer from "./students.reducer";
import teacherReducer from "./teachers.reducer";
import loadingReducer from "./loading.reducer";
import lessonsReducer from "./lessons.reducer";
import userContentReducer from "./userContent.reducer";
import progressReducer from "./progress.reducer";
import cohortReducer from "./cohort.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  conditionalForms, // This contains all of the boolean values for conditional forms
  unit,
  contentReducer,
  studentsReducer, //Contains all users with access level 1, meaning all students
  newRegistrantsReducer, //Contains all users with access level 0 meaning new user
  teacherReducer, //Contains all teachers and their students
  loadingReducer,
  lessonsReducer,
  userContentReducer,
  progressReducer,
  cohortReducer,
});

export default rootReducer;
