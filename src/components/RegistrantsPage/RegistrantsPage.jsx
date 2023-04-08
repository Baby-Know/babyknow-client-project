import React from 'react';
import {useSelector} from 'react-redux';

function RegistrantsPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1>Registrants Page!</h1>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default RegistrantsPage;
