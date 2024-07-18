// src/components/TaskForm.js
import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/TaskForm.css'; // Ensure the CSS file path is correct

const TaskForm = () => {
  const navigate = useNavigate();
  const { addTask, updateTask } = useContext(TaskContext);
  const location = useLocation();
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (location.state) {
      const { id, title, description } = location.state;
      setId(id);
      setTitle(title);
      setDescription(description);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateTask({ id, title, description });
      navigate('/tasks');
    } else {
      await addTask({ title, description, status: 'pending' });
      navigate('/tasks'); // Navigate to task list after adding task
    }
    // Reset form state
    setId('');
    setTitle('');
    setDescription('');
  };

  const handleTaskList = () => {
    navigate('/tasks'); // Navigate to task list
  };

  return (
    <div className="form-container">
      <div className="task-form-header">
      <div className="form-title">
          <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
        </div>
        <div className="form-actions">
          <button className="task-list-btn" onClick={handleTaskList}>Task List</button>
        </div>
      </div>&nbsp;
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">{id ? 'Update Task' : 'Add Task'}</button>
      </form>
    </div>
  );
};

export default TaskForm;
