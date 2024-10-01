import React, { useState, useContext, useEffect } from 'react';
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
    <div className="login-container"> 
      <h2>Login</h2>
      {errors.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="error-message">{error.msg || error}</p>
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
