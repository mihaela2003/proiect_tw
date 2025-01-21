import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllEventsPages.css';

const AllEventsPage = () => {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
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

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div id="all-events-page">
    <h2 id="all-events-title">Lista tuturor evenimentelor</h2>

    {events.length === 0 ? (
      <p>Nu există evenimente sau se încarcă datele...</p>
    ) : (
      <table id="events-table">
        <thead>
          <tr>
            <th>Nume</th>
            <th>Data începerii</th>
            <th>Data încheierii</th>
            <th>Cod</th>
            <th>Open?</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.startingTime}</td>
              <td>{event.endingTime}</td>
              <td>{event.code}</td>
              <td>{event.isOpen ? 'Da' : 'Nu'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    <button id="go-back-button" onClick={handleGoBack}>
      Go Back to Home
    </button>
  </div>
  );
};

export default AllEventsPage;