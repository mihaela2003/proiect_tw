import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const { id: groupId } = useParams();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const [eventName, setEventName] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [endingTime, setEndingTime] = useState('');
  const [eventGroupName, setEventGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/groups/getAllGroups`);
        const data = await response.json();
        console.log(data);
        setGroups(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);

  function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const now = new Date();
    const start = new Date(startingTime);
    const end = new Date(endingTime);
    let isOpenValue = false;

    now.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    console.log("Current Date (now):", now);
    console.log("Start Date (start):", start);
    console.log("End Date (end):", end);
  
    if(start <= now && now <= end){
      isOpenValue = true;
    }
    console.log("isOpenValue:", isOpenValue);

    const groupFound = groups.find((g) => g.groupName === eventGroupName);
    
  if (!groupFound) {
    console.error("Grupul nu a fost găsit în lista de grupuri.");
    return; 
  }
  
    const newEvent = {
      name: eventName,
      startingTime,
      endingTime,
      code: generateRandomCode(8),
      isOpen: isOpenValue, 
      groupId: groupFound.id
    };

    try {
      const response = await fetch('http://localhost:5001/api/events/addEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        const updatedEvents = await fetch(`http://localhost:5001/api/events/getAllEvents?groupId=${groupId}`);
        const updatedData = await updatedEvents.json();
        setEvents(updatedData);
        setEventName('');
        setStartingTime('');
        setEndingTime('');
        setEventGroupName('');
      } else {
        console.error('Failed to create event.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div id="events-page">
      <h2 id="events-title">Events for Group {groupId}</h2>

      <form id="events-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="eventName">Event Name:</label>
          <input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startingTime">Starting Time:</label>
          <input
            id="startingTime"
            type="datetime-local"
            value={startingTime}
            onChange={(e) => setStartingTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endingTime">Ending Time:</label>
          <input
            id="endingTime"
            type="datetime-local"
            value={endingTime}
            onChange={(e) => setEndingTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventGroupName">Group Name:</label>
          <input
            id="eventGroupName"
            type="text"
            value={eventGroupName}
            onChange={(e) => setEventGroupName(e.target.value)}
            required
          />
        </div>
        <button id="create-event-button" type="submit">Create Event</button>
      </form>

      <p id="events-back-text">
        If you've finished adding events, click below to return to Home.
      </p>
      <button id="go-back-button" onClick={handleGoBack}>Go Back to Home</button>
    </div>
  );
};

export default Events;