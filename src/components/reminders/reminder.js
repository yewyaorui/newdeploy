// src/components/Reminder.js
import React, { useState, useEffect } from 'react';

const Reminder = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reminders, setReminders] = useState([]);
  const [timeoutIds, setTimeoutIds] = useState([]);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          alert('Please allow notification access!');
        }
      });
    }
  }, []);

  const scheduleReminder = () => {
    const dateTimeString = `${date} ${time}`;
    const scheduledTime = new Date(dateTimeString);
    const currentTime = new Date();
    const timeDifference = scheduledTime - currentTime;

    console.log('Scheduled Time:', scheduledTime);
    console.log('Current Time:', currentTime);
    console.log('Time Difference:', timeDifference);

    if (timeDifference > 0) {
      addReminder(title, description, dateTimeString);

      const timeoutId = setTimeout(() => {
        console.log('Sending notification for:', title);
        new Notification(title, {
          body: description,
          requireInteraction: true,
        });
      }, timeDifference);

      setTimeoutIds([...timeoutIds, timeoutId]);
    } else {
      alert('The scheduled time is in the past!');
    }
  };

  const addReminder = (title, description, dateTimeString) => {
    setReminders([...reminders, { title, description, dateTimeString }]);
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
  };

  const deleteReminder = (index) => {
    clearTimeout(timeoutIds[index]);
    setTimeoutIds(timeoutIds.filter((_, i) => i !== index));
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="container" style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginTop: '-100px', marginBottom: '0px' }}>Reminders!</h2>

      <label style={labelStyle}>Title :</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
      <label style={labelStyle}>Description :</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
      <label style={labelStyle}>Date :</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
      <label style={labelStyle}>Time :</label>
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
      <button onClick={scheduleReminder} style={buttonStyle}>Schedule Reminder</button>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder, index) => (
            <tr key={index}>
              <td>{reminder.title}</td>
              <td>{reminder.description}</td>
              <td>{reminder.dateTimeString}</td>
              <td>
                <button onClick={() => deleteReminder(index)} style={buttonStyle}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <audio src="" id="notificationSound"></audio>
    </div>
  );
};

const containerStyle = {
  width: '100vw', // Full viewport width
  height: '100vh', // Full viewport height
  fontFamily: "Arial",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden', // Prevent scrolling
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
};

const inputStyle = {
  //Adjust to fill width without overflow
  marginLeft: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  padding: '10px',
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
  backgroundColor: '#F2E5E5',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#E8C4C4',
  padding: '15px',
  border: 'none',
  marginTop: '5px',
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
  
  
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '5px',
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
  backgroundColor: '#2B3A55',
  color: 'white',
};

const labelStyle = {
  marginBottom: '0px',
};

export default Reminder;
