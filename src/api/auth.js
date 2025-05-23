import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const login = async (email, password) => {
  try {
    
    const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
    
    if (response.data.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = response.data[0];
    
  
    const mockToken = `mock-token-${user.id}-${Date.now()}`;
    
    return { user, token: mockToken };
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const checkAuth = async (token) => {
  try {
   
    if (!token.startsWith('mock-token-')) {
      throw new Error('Invalid token');
    }
    
    const userId = parseInt(token.split('-')[2]);
    const response = await axios.get(`${API_URL}/users/${userId}`);
    
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};