const axios = require('axios');

// Function to get weather data
async function getWeather(req, res) {
    const city = req.query.city; 
    const apiKey = process.env.WEATHER_API_KEY; 
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&city=${city}`;
    console.log(url);
    try {
      
        const response = await fetch(url);
        const decodedResponse = await response.json();
        const data = decodedResponse.data; 

        res.json(data);
    } catch (error) {
       
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
}

module.exports = { getWeather };
