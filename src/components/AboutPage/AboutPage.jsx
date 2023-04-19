import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h1>Welcome to Baby Know</h1>
        <p>
        Our course is designed to support parents and caregivers throughout their child’s first year of life by providing 
        easily accessible video lessons covering all aspects of child development in addition to strategies and activities to promote the overall well-being of the entire family. 
        To learn more about our course, check out the video below. </p>
      </div>
    </div>
  );
}

export default AboutPage;
