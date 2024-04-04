'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(cors());


const weatherData = require('./data/weather.json');


class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

//http://localhost:3000/weather?lat=47.6038321&lon=-122.330062&searchQuery=Seattle

app.get('/weather', (request, response) => {
    const { lat, lon, searchQuery } = request.query;
    console.log(lat, lon, searchQuery);

  const cityData = weatherData.find(city => 
    city.city_name === searchQuery && city.lat === lat && city.lon === lon);
  if (!cityData) {
    response.status(404).send('City not found or no weather data available for the specified location.');
    return;
  }

  console.log(`this is city data forecast`, cityData.data); 

  const forecasts = cityData.data.map(forecastData => {
    const description = `Low of ${forecastData.min_temp}, high of ${forecastData.max_temp} with ${forecastData.weather.description}`;
    return new Forecast(forecastData.valid_date, description);
});
  response.json(forecasts);
});

app.get('/', (request, response) => {
    response.send(`Hello, this is your Express server!`);
});

async function getLocation(request, response) {

  console.log(request.query);

  let city = request.query.city;

  let url = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATION_API_KEY}&q=${city}&format=json`;
  const apiResponse = await axios.get(url);
  const data = apiResponse.data;
  response.json( data[0] );
}


function startServer() {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

startServer();