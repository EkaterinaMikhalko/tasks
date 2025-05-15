import axios from 'axios';

const API_URL = 'http://localhost:3001';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getTasks = async (filter = 'all') => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const userId = parseInt(token.split('-')[2]);
    let url = `${API_URL}/tasks`;
    
    // Apply filters
    if (filter === 'my') {
      url += `?userId=${userId}`;
    } else if (filter === 'shared') {
      url += `?isShared=true`;
    }
    
    const response = await axios.get(url, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');
    
    const userId = parseInt(token.split('-')[2]);
    const newTask = {
      ...taskData,
      userId,
      createdAt: new Date().toISOString(),
      id: Date.now() // Mock ID generation
    };
    
    const response = await axios.post(`${API_URL}/tasks`, newTask, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${id}`, taskData, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeader());
    return { id };
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getTaskDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`, getAuthHeader());
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};