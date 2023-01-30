const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 1,
        max: 25,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: {
        type: DataTypes.DATEONLY, 
      },
      rating: {
        type: DataTypes.FLOAT,
        min: 0,
        max: 5,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      image: {
        type: DataTypes.STRING(1000),
      },
    },
    { timestamps: false }
  );
};

/* 
Videojuego con las siguientes propiedades:
ID: * No puede ser un ID de un videojuego ya existente en la API rawg
Nombre *
Descripción *
Fecha de lanzamiento
Rating
Plataformas *
*/
