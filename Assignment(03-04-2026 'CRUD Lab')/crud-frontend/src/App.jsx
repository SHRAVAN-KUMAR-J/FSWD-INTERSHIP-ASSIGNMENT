import React, { useState, useEffect } from 'react';
import API from './api';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await API.get('/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Create and Update
  const handleSave = async (method, id, data) => {
    try {
      if (method === 'post') {
        await API.post('/', data);
      } else {
        await API.put(`/${id}`, data);
      }
      fetchUsers();           // Refresh list
      setCurrentUser(null);   // Reset form
    } catch (error) {
      alert('Operation failed: ' + error.message);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/${id}`);
        fetchUsers();
      } catch (error) {
        alert('Delete failed: ' + error.message);
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="app">
      <h1>CRUD Lab - User Management</h1>
      
      <UserForm 
        currentUser={currentUser} 
        onSuccess={handleSave} 
      />

      <UserList 
        users={users} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;