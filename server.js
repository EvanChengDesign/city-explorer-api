'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Environment Variables
const PORT = process.env.PORT || 3000;

//App Initialization
app.use(cors());
const app = express();

const { getWeather } = require('./weather');
const { getMovies } = require('./movies');

app.get('/', (req, res) => {
  res.send('Welcome to the Server! Use /movies or /weather to get started.');
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);

function startServer() {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}

startServer();