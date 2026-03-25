// src/App.js
import React from 'react';
// Change from './components/TaskList' to './components/TaskList.jsx'
import TaskList from './components/TaskList.jsx';
// import AdvancedTaskList from './components/AdvancedTaskList.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <TaskList />
      {/* <AdvancedTaskList /> */}
    </div>
  );
}

export default App;