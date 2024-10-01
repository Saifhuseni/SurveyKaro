import React, { useState, useContext, useEffect } from 'react';
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

  // Set the background image on component mount
  useEffect(() => {
    document.body.style.backgroundImage = 'url("https://img.freepik.com/premium-vector/blue-white-abstract-background-design-well-use-as-wallpaper-website-template-background_756251-43.jpg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.height = '100vh';

    // Clean up the effect when the component is unmounted
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <div className="register-container"> {/* Add class name here */}
      <h2>Register</h2>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="error-message">{error.msg || error}</p>
        ))}
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
