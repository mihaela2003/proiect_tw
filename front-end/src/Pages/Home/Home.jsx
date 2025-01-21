import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [groups, setGroups] = useState([]);
  const [eventCode, setEventCode] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/groups/getAllGroups');
        const data = await response.json();
        console.log(data);
        setGroups(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const getUser = async () => {
      axios
        .get('http://localhost:5001/api/users/getCurrentUser', {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        });
    };

    getUser();

    const fetchAllEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/events/getAllEvents');
        if (!response.ok) {
          throw new Error('Eroare la încărcarea evenimentelor.');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Eroare la obținerea evenimentelor:', error);
      }
    };

    fetchAllEvents();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');

      const response = await fetch('http://localhost:5001/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
    navigate('/');
  };

  const handleCreateGroup = () => {
    navigate('/createPage');
  };

  const handleAllEvents = () => {
    navigate('/allEventsPages');
  };
  const handleAllAttendaces = () => {
    navigate('/allAttendances');
  };

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

  const handleAddAttendance = async () => {
    const userId = getUserIdFromToken();
    if (!eventCode) {
      console.error('Event code is required');
      return;
    }
    if (!userId) {
      console.error('User ID could not be extracted from token');
      return;
    }
    const eventFound = events.find((e) => e.code === eventCode);
    console.log(eventCode, " ", userId, " ", eventFound.eventId);
    try {
      const response = await fetch(`http://localhost:5001/api/attendance/addAttendance/${eventCode}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            userId: userId,
            checkInTime: new Date(),
            eventId: eventFound.eventId,
          }),
        }
      );

      console.log(response);
      if (response.ok) {
        console.log('Attendance added successfully');
      } else {
        console.error('Failed to add attendance');
      }
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  return (
    <div className='containerHome'>
      <h1 className='titleHome'>Groups</h1>

      <div className='addAttendanceContainer'>
        <input
          type="text"
          placeholder="Enter event code"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
        />
        <button onClick={handleAddAttendance} className='btnHome'>
          Add Attendance
        </button>
      </div>

      {user.isAdmin ? (
        <>
        <button onClick={handleCreateGroup} className='btnHome'>
          Create Group
        </button>
      <Link to="/events/${group.groupId}">
        <button className='btnHome'>Add Event</button>
      </Link>
      <button onClick={handleAllEvents} className='btnHome'>
          View Events
        </button>
        <button onClick={handleAllAttendaces} className='btnHome'>
          View Attendances
        </button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;