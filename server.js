'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios'); 
const PORT = process.env.PORT || 3000;
app.use(cors());

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

//http://localhost:3000/weather?lat=47.6038321&lon=-122.330062&searchQuery=Seattle

app.get('/', (req, res) => {
  res.send('Welcome to the Server! Use /movies or /weather to get started.');
});


app.get('/weather', async (req, res) => {
  try {
    const city = req.query.city;

    const weatherAPIkey = process.env.WEATHER_API_KEY;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${weatherAPIkey}&days=3`;
    let reply = await fetch(weatherUrl);
    let jsonData = await reply.json();

    console.log(`this is city data forecast`, jsonData.data);

    let forecasts = jsonData.data.map(forecastData => {
      const description = `Low of ${forecastData.min_temp}, high of ${forecastData.max_temp} with ${forecastData.weather.description}`;
      return { date: forecastData.valid_date, description: description };
    });

    res.json(forecasts);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//http://localhost:3000/movies?location=seattle (/movies is the route) ? = (key value pairs) 
app.get('/movies', async (req, res) => {
  const { location } = req.query; // Entire url is the query. Anything after the ? are the variables/parameters 
  if (!location) {
    return res.status(400).send({ error: 'Location is required' });
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;

  try {
    const response = await axios.get(url);
    const movies = response.data.results.map(movie => ({
      title: movie.title,
      overview: movie.overview,
      average_votes: movie.vote_average.toString(),
      total_votes: movie.vote_count.toString(),
      image_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      popularity: movie.popularity.toString(),
      released_on: movie.release_date
    }));
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});


async function getLocation(request, reply) {

  console.log(request.query);

  let city = request.query.city;

  let url = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATION_API_KEY}&q=${city}&format=json`;
  const apiResponse = await axios.get(url);
  const data = apiResponse.data;
  response.json( data[0] );
}


function startServer() {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}

startServer();