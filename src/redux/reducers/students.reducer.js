import { combineReducers } from "redux";

const allStudentsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return action.payload;
    default:
      return state;
  }
};

const studentsByTeacherReducer = (state =[], action) => {
  switch (action.type) {
    case "SET_STUDENTS_BY_TEACHER":
      return action.payload;
    default:
      return state;
  }
}

const studentsReducer = combineReducers({
  allStudentsReducer,
  studentsByTeacherReducer
})

export default studentsReducer;
