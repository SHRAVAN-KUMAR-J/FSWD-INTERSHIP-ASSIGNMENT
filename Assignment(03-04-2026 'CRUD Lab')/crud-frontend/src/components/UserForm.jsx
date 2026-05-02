import React, { useState, useEffect } from 'react';

const UserForm = ({ currentUser, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  // If editing, fill the form
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        age: currentUser.age
      });
    } else {
      setFormData({ name: '', email: '', age: '' });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentUser) {
        // Update
        await onSuccess('put', currentUser._id, formData);
      } else {
        // Create
        await onSuccess('post', null, formData);
      }
      
      // Reset form after submit
      setFormData({ name: '', email: '', age: '' });
    } catch (error) {
      alert('Error saving user: ' + error.message);
    }
  };

  return (
    <div className="user-form">
      <h2>{currentUser ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {currentUser ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;