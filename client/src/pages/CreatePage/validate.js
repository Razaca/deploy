export default function validation(data) {
  const errors = {
    name: "",
    description: "",
    image: "",
    released: "",
    rating: "",
    genres: "",
    platforms: "",
  };

  const genres = [];
  for (const key in data.genres) {
    if (data.genres[key]) {
      genres.push(parseInt(key));
    }
  }
  const platforms = Object.values(data.platforms);

  /* name */
  if (!data.name) {
    errors.name = "Debe completar este campo";
  } else if (data.name.length > 15) {
    errors.name = "No debe superar los 15 caracteres";
  }

  /* description */
  if (!data.description) {
    errors.description = "Debe completar este campo";
  } else if (data.description.length > 150) {
    errors.description = "Superaste el maximo de caracteres";
  }

  /* released */
  function isValidDate(date) {
    var dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return dateFormat.test(date);
  }
  if (!data.released) {
    errors.platforms = "Debe completar este campo";
  } else if (isValidDate(data.released)) {
    errors.platforms = "La fecha deber tener el formato: MM/DD/YYYY";
  }

  /* image */
  if (!data.image) {
    errors.image = "Insete una URL";
  }

  /* rating */

  if (data.rating < 0) {
    errors.rating = "El rating es entre 0 y 5";
  } else if (data.rating > 5) {
    errors.rating = "El rating es entre 0 y 5";
  }

  /* genres */

  if (genres.length <= 0) {
    errors.genres = "Debes elegir por lo menos un genero";
  }

  /* platform */
  console.log({ platforms, genres });
  if (platforms.length <= 0) {
    errors.platforms = "Debes elegir por lo menos una plataforma";
  }

  return errors;
}
