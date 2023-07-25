// src/api/api.js
import axios from 'axios';

export const fetchSneakers = async () => {
  const response = await axios.get('/sneakers/view-all');
  return response.data;
};
