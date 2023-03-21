import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { signIn } from '../utils/api/api';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await signIn(email, password);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

const SignInPage = () => {
  return (
    <BrowserRouter>
      <SignInForm />
    </BrowserRouter>
  );
};

export default SignInPage;