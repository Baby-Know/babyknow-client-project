import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import unit from './unit.reducer';
import conditionalForms from './conditionalForms';
import newRegistrantsReducer from './newRegistrants.reducer';
import studentsReducer from './students.reducer';

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
  studentsReducer, //Contains all users with access level 1, meaning all students
  newRegistrantsReducer,
});

export default rootReducer;
