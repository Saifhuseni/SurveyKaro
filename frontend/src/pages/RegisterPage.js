import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { register } from '../services/authService';

const RegisterPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const data = await register(formData);
      login(data.token); // Save token and update context
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data.errors || [err.response.data.msg]);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errors.length > 0 &&
        errors.map((error, index) => <p key={index} style={{ color: 'red' }}>{error.msg || error}</p>)}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <br />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
