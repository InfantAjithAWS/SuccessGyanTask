// apiService.js
import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('token'),
  },
});

const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, updatedTask);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  loginUser,
  registerUser,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
