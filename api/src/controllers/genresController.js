const axios = require("axios");
require("dotenv").config();
const API_KEY = `?key=${process.env.API_KEY}`;

async function getGenres() {
  const data = await axios(`https://api.rawg.io/api/genres${API_KEY}`);
  const genres = data.data.results;
  return genres;
}

module.exports = getGenres;


  /*   const filter = [];
  genres.forEach((el) => {
    filter.push({
      id: el.id,
      name: el.name,
      count: el.games_count,
      image: el.image_background,
    });s
  }); */