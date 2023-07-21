// server/api/routes/example.js
const express = require('express');
const router = express.Router();
const getRecommendations = require('../utils/get_recommendations');

router.post('/example', async (req, res) => {
    const data = {
        userName: req.body.userName,
        categories: req.body.categories,
    };
    
    const recommendations = await getRecommendations(data);
    
    res.json(recommendations);
});

module.exports = router;
