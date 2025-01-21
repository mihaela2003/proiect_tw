import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllAttendances.css';

const AllAttendancesPage = () => {
  const [attendances, setAttendances] = useState([]);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/attendance/getAllAttendancesList');
        if (!response.ok) {
          throw new Error('Eroare la preluarea listării de attendance');
        }
        const data = await response.json();
        setAttendances(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttendances();

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

    const fetchAllUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/users/getAllUsers');
        if (!response.ok) {
          throw new Error('Eroare la încărcarea evenimentelor.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Eroare la obținerea evenimentelor:', error);
      }
    };

    fetchAllUsers();
  }, []);

  
  const getUserNameById = (userId) => {
    const user = users.find(u => u.userId === userId);
    console.log("user: ", user);
    return user ? user.name : 'N/A';
  };


  const getEventNameById = (eventId) => {
    const event = events.find(e => e.eventId === eventId);
    console.log("event: ", event);
    return event ? event.name : 'N/A';
  };

  const handleExportCSV = () => {
    const csvHeaders = ["ID Attendance", "Nume Participant", "Nume Eveniment", "Check-In Time"];

    const csvRows = attendances.map((att) => {
      const participantName = getUserNameById(att.userId);
      const eventName = getEventNameById(att.eventId);
      return [
        att.id,
        participantName,
        eventName,
        att.checkInTime || 'N/A'
      ].join(",");
    });

    const csvString = [
      csvHeaders.join(","), 
      ...csvRows 
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

   
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendance_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleGoBack = () => {
    navigate('/home');
  };

  return (
    <div id="all-attendances-page">
    <h2 id="all-attendances-title">Lista tuturor participanților (attendance)</h2>
    {attendances.length === 0 ? (
      <p id="no-attendances-message">Nu există înregistrări de attendance...</p>
    ) : (
      <table id="attendances-table">
        <thead>
          <tr>
            <th>ID Attendance</th>
            <th>Nume Participant</th>
            <th>Nume Eveniment</th>
            <th>Check-In Time</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((att) => (
            <tr key={att.id}>
              <td>{att.id}</td>
              <td>{getUserNameById(att.userId)}</td>
              <td>{getEventNameById(att.eventId)}</td>
              <td>{att.checkInTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    <button className="button" onClick={handleExportCSV}>
      Export CSV
    </button>
    <button className="button" onClick={handleGoBack}>
      Go Back to Home
    </button>
  </div>
  );
};

export default AllAttendancesPage;