import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <div>
      <h1>Welcome to the HomePage</h1>
      {loggedIn ? (
        <div>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Link to="/login">Login</Link>
        </div>
      )}
      <button onClick={handleLogin}>Fake Login</button>
    </div>
  );
}

export default HomePage;