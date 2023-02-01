const { Router } = require("express");
const router = Router();
const {
  getVideogames,
  getVideogameById,
  createVideogame,
} = require("../controllers/videogamesController");

router.get("/", async (req, res) => {
  const { name, page } = req.query;
  try {
    games = await getVideogames(name, page);
    res.status(200).json({ games });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:idVideogame", async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const game = await getVideogameById(idVideogame);
    res.status(200).json({ game });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  const { name, description, released, rating, platforms, genres, image } =
    req.body;
  const id = `db-${Date.now()}`;
  try {
    const game = createVideogame({
      id,
      name,
      description,
      released,
      rating,
      platforms,
      genres,
      image,
    });
    res.json({ game });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

/* 
GET /videogames:
Obtener un listado de los videojuegos
Debe devolver solo los datos necesarios para la ruta principal
 GET /videogames?name="...":
Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
Si no existe ningún videojuego mostrar un mensaje adecuado
 GET /videogame/{idVideogame}:
Obtener el detalle de un videojuego en particular
Debe traer solo los datos pedidos en la ruta de detalle de videojuego
Incluir los géneros asociados
 POST /videogames:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
Crea un videojuego en la base de datos, relacionado a sus géneros.
*/
