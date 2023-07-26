import axios from 'axios';

export const fetchSneakers = async () => {
  const response = await axios.get('/sneakers/view-all');
  return response.data;
};

export const userSignup = async (userData) => {
  const response = await axios.post('/users/signup', userData);
  return response.data;
};

export const userLogin = async (userData) => {
  const response = await axios.post('/users/login', userData);
  return response.data;
};