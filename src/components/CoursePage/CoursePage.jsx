import React from 'react';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h1>Course Page!</h1>
      <h2>Welcome, {user.firstName}!</h2>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
