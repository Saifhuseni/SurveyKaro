import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../services/authService';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const data = await loginService(formData);
      login(data.token); // Save token and update context
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors || [err.response.data.msg]);
      }
    }
  };

  return (
    <div className="login-container"> {/* Add class name here */}
      <h2>Login</h2>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="error-message">{error.msg || error}</p> // Add class name for error
        ))}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
