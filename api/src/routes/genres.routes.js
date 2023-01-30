const { Router } = require("express");
const getGenres = require("../controllers/genresController");
const { Genre } = require("../db");
const router = Router();

router.get("/", async (req, res) => {
  try {
    let genres = await Genre.findAll();

    if (!genres.length) {
      console.log("Info traida de la API");
      const genresApi = await getGenres();
      await Genre.bulkCreate(genresApi);
      genres = await Genre.findAll();
    }

    res.json({ genres });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

/* 
 GET /genres:
Obtener todos los tipos de géneros de videojuegos posibles
En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
*/
