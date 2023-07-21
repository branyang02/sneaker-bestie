// server/api/utils/get_recommend_from_flask.js
const axios = require('axios');

async function getRecommendations(data) {
    const response = await axios.post('http://localhost:5000/recommend', data);
    return response.data;
}

module.exports = getRecommendations;
