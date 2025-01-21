import "./SignUp.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/users/addUser', formData);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div id="mainSignUp">
      <h2 id="titleSignUp">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label id="labelSignUp" htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <button id="btnSignUp" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
