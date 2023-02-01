const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const { Videogame, Genre } = require("../db");

const API_KEY = `?key=${process.env.API_KEY}`;

async function getVideogames(name, page) {
  let dataApi;
  let dataMydb;

  /* dataApi */
  name
    ? (dataApi = await axios(
        `https://api.rawg.io/api/games${API_KEY}&search=${name}`
      ))
    : (dataApi = await axios(
        `https://api.rawg.io/api/games${API_KEY}&page=${page ? page : 1}`
      ));
  dataApi = dataApi.data.results;

  /* dataMydb */
  name
    ? (dataMydb = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [
          {
            model: Genre,
          },
        ],
      }))
    : (dataMydb = await Videogame.findAll({
        include: [
          {
            model: Genre,
          },
        ],
      }));

  if (name && !dataApi.length) throw Error("No hay juegos con ese nombre");

  const filter = [];
  dataApi.forEach((el) => {
    filter.push({
      id: el.id,
      name: el.name,
      description: el.description,
      released: el.released,
      rating: el.rating,
      image: el.background_image,
      genres: el.genres,
      platforms: el.platforms.map((el) => el.platform),
    });
  });
  return [...dataMydb, ...filter];
}

async function getVideogameById(id) {
  let data = await Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
      },
    ],
  });

  if (!data) {
    const api = await axios(`https://api.rawg.io/api/games/${id}${API_KEY}`);
    const game = api.data;

    data = {
      id: game.id,
      name: game.name,
      description: game.description,
      released: game.released,
      rating: game.rating,
      image: game.background_image,
      platforms: game.platforms,
      genres: game.genres.map((el) => el.name),
    };

    return { data };
  }

  return { data };
}

async function createVideogame(game) {
  const createGame = await Videogame.create(game);
  await createGame.setGenres(game.genres);
  return game;
}

module.exports = { getVideogames, getVideogameById, createVideogame };

/* 
findAll({
  include: [
    {
      model: Videogame
    },
  ],
});
*/

//funcion para traer de a muchas paginas
/* 
async function getVideogames(name) {
  let dataApi;
  let dataMydb;

  const dataPages = [
    `https://api.rawg.io/api/games${API_KEY}&page=1`,
    `https://api.rawg.io/api/games${API_KEY}&page=2`,
    `https://api.rawg.io/api/games${API_KEY}&page=3`,
    `https://api.rawg.io/api/games${API_KEY}&page=4`,
    `https://api.rawg.io/api/games${API_KEY}&page=5`,
  ];


  name
    ? (dataApi = await axios(
        `https://api.rawg.io/api/games${API_KEY}&search=${name}`
      ))
    : await Promise.all(dataPages.map((page) => axios(page)))
        .then((responses) => {
          dataApi = responses.map((response) => response.data.results);
        })
        .catch((error) => {
          console.log(error);
        });

  name
    ? (dataMydb = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [
          {
            model: Genre,
          },
        ],
      }))
    : (dataMydb = await Videogame.findAll({
        include: [
          {
            model: Genre,
          },
        ],
      }));

  if (name && !dataApi.length) throw Error("No hay juegos con ese nombre");

  const filter = [];
  dataApi.concat(...dataApi).forEach((el) => {
    filter.push({
      id: el.id,
      name: el.name,
      description: el.description,
      released: el.released,
      rating: el.rating,
      image: el.background_image,
      genres: el.genres,
      //platforms: el.platforms,
    });
  });
  filter.splice(0, 3)
  return [...dataMydb, ...filter];
}
*/
