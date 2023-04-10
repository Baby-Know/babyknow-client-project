import React from "react";
import { useSelector } from "react-redux";
import NewRegistrants from "./NewRegistrants/NewRegistrants";
import Students from "./Students/Students";

function RegistrantsPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1>Registrants Page!</h1>
      <h3>New Registrants</h3>
      <NewRegistrants />
      <h3>Students</h3>
      <Students />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default RegistrantsPage;
