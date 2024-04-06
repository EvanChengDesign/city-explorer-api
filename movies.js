const axios = require('axios');
const { cache } = require('./cache'); 
require('dotenv').config();

async function getMovies(req, res) {
  const location = req.query.city;
  if (!location) {
    return res.status(400).send({ error: 'Location is required' });
  }

  const cacheKey = `movies-${location.toLowerCase()}`;
  const now = Date.now();
  const oneDayInMilliseconds = 86400000; // 24 hours

  if (cache[cacheKey] && (now - cache[cacheKey].timestamp < oneDayInMilliseconds)) {
    console.log('Serving from cache');
    return res.json({
      movies: cache[cacheKey].data,
      timestamp: cache[cacheKey].timestamp
    });
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

    cache[cacheKey] = {
      timestamp: now, 
      data: movies
    };

    res.json({
      movies: movies,
      timestamp: now
    });
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

module.exports = { getMovies };
