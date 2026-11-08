import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // Using state to store student and course details 
  const [labDetails] = useState({
    course: "Welcome to Fullstack Development - 1",
    exercise: "React JS Programming Week09 Lab exercise",
    studentId: "101577665", 
    name: "Kalid Ali",
    college: "George Brown College, Toronto"
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{labDetails.course}</h1>
        <h2>{labDetails.exercise}</h2>
        <p><strong>Student ID:</strong> {labDetails.studentId}</p>
        <p><strong>Name:</strong> {labDetails.name}</p>
        <p>{labDetails.college}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
