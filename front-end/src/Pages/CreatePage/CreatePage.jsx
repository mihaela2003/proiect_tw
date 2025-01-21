import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import './CreatePage.css';

const CreatePage = () => {
  const [groupName, setGroupName] = useState('');
  const [currentUser, setCurrentUser] = useState(null); 
  const navigate = useNavigate();


  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return null;
    }
    
    try {
      const decoded = jwtDecode(token);  
      console.log('Decoded token:', decoded);
      return decoded.userId;  
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  

  const handleCreateGroup = async () => {
    const userId = getUserIdFromToken();
  
    if (!userId) {
      console.error('User ID is not available.');
      toast.error('You must be logged in.');
      return;
    }
    console.log('userId:', userId);
    try {
    const payload = {
      groupName: groupName,
      userId: userId,
    };
    console.log('payload: ', payload);

      const response = await axios.post('http://localhost:5001/api/groups/addGroup', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status === 201) {
        toast.success('Group created successfully!');
        navigate('/home');
      } else {
        console.error('Group creation failed:', response.data);
        toast.error('Failed to create group.');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      toast.error('Error creating group. Please try again.');
    }
  };

  return (
    <div id="create-group-page">
    <h1 id="page-title">Create Group</h1>
    <label id="group-name-label">
      Group Name:
      <input
        id="group-name-input"
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
      />
    </label>
    <button id="create-group-button" onClick={handleCreateGroup}>
      Create Group
    </button>
  </div>
  );
};

export default CreatePage;