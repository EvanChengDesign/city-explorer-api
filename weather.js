'use strict';

require('dotenv').config();
const fetch = require('node-fetch'); // Ensure you're using node-fetch if running in a Node environment

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

async function getWeather(req, res) {
  try {
    const city = req.query.city;
    const weatherAPIkey = process.env.WEATHER_API_KEY;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${weatherAPIkey}&days=3`;
    let reply = await fetch(weatherUrl);
    let jsonData = await reply.json();

    let forecasts = jsonData.data.map(forecastData => {
      const description = `Low of ${forecastData.min_temp}, high of ${forecastData.max_temp} with ${forecastData.weather.description}`;
      return new Forecast(forecastData.valid_date, description);
    });

    res.json(forecasts);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getWeather };