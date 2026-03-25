import React, { useState, useEffect } from 'react';
import './AdvancedTaskList.css';

const AdvancedTaskList = () => {
  // Initialize state from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [priority, setPriority] = useState('medium');

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add task with validation
  const addTask = () => {
    if (inputValue.trim().length < 3) {
      alert('Task must be at least 3 characters long');
      return;
    }
    
    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      priority: priority,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
    setPriority('medium');
  };

  // Delete task with confirmation
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Update task priority
  const updatePriority = (id, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority: newPriority } : task
    ));
  };

  // Edit task text
  const editTask = (id, newText) => {
    if (newText.trim().length >= 3) {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, text: newText.trim() } : task
      ));
    }
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffbb33';
      case 'low': return '#00C851';
      default: return '#ffffff';
    }
  };

  // Filtered and sorted tasks
  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      // Sort by priority (high -> medium -> low)
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="advanced-container">
      <h1>📋 Advanced Task Manager</h1>
      
      {/* Stats Section */}
      <div className="stats">
        <span>📊 Total: {tasks.length}</span>
        <span>✅ Active: {tasks.filter(t => !t.completed).length}</span>
        <span>✔️ Completed: {tasks.filter(t => t.completed).length}</span>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task (min. 3 characters)"
          className="task-input"
        />
        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
        <button onClick={addTask} className="add-btn">
          ➕ Add Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-section">
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={filter === filterType ? 'active' : ''}
          >
            {filterType === 'all' && '📋 All'}
            {filterType === 'active' && '🟢 Active'}
            {filterType === 'completed' && '✅ Completed'}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-message">✨ No tasks to display. Add some tasks!</p>
        ) : (
          filteredTasks.map(task => (
            <li 
              key={task.id} 
              className={`task-item ${task.completed ? 'completed' : ''}`}
              style={{ borderLeft: `8px solid ${getPriorityColor(task.priority)}` }}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="task-checkbox"
                />
                
                {/* Editable task text */}
                <span 
                  className="task-text"
                  contentEditable={!task.completed}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => editTask(task.id, e.target.textContent)}
                >
                  {task.text}
                </span>

                {/* Priority selector */}
                <select
                  value={task.priority}
                  onChange={(e) => updatePriority(task.id, e.target.value)}
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                  disabled={task.completed}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <small className="task-date">
                  {new Date(task.createdAt).toLocaleDateString()}
                </small>
              </div>
              
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
                title="Delete task"
              >
                🗑️
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
          🧹 Clear Completed Tasks
        </button>
      )}
    </div>
  );
};

export default AdvancedTaskList;