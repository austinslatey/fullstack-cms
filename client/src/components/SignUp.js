import React, { useState } from 'react';
import PropTypes from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement your signup logic here
    // ...
    // Redirect to profile page after signup is complete
    history.push('/profile');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

SignUp.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default SignUp;