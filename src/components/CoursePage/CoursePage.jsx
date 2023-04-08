import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AddUnitForm from "./AddUnitForm/AddUnitForm";
import AddCohortForm from "./AddCohortForm/AddCohortForm";

function UserPage() {
  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h1>Course Page!</h1>
      <h2>Welcome, {user.firstName}!</h2>
      <button
        onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_UNIT",
            payload: true,
          });
        }}
      >
        Add Unit
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_SHOW_ADD_COHORT",
            payload: true,
          });
        }}
      >
        Add Cohort
      </button>
      <AddUnitForm />
      <AddCohortForm />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
