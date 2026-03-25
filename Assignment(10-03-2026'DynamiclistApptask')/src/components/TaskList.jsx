// src/components/TaskList.jsx
import React, { useState } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Add a new task
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toLocaleString()
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks based on selection
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="task-container">
      <h1>📝 Dynamic Task List</h1>
      <p>Total Tasks: {tasks.length}</p>
      
      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-btn">
          Add Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-section">
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      {/* Tasks List */}
      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-message">No tasks to display</p>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
                <small className="task-date">{task.createdAt}</small>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                ❌ Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Clear Completed Button */}
      {tasks.some(task => task.completed) && (
        <button 
          onClick={() => setTasks(tasks.filter(task => !task.completed))}
          className="clear-btn"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default TaskList;