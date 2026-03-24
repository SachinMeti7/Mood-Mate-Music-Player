import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to Mood Music App</h1>
      <p>Discover songs based on your mood!</p>
      <Link to="/home">
        <button>Explore</button>
      </Link>
    </div>
  );
};

export default LandingPage;