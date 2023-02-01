import { useState } from "react";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({
    name: "Debes completar este campo",
    description: "Debes completar este campo",
    image: "Debes completar este campo",
    released: "Debes completar este campo",
    rating: "Debes completar este campo",
    genres: "Debes completar este campo",
    platforms: "Debes completar este campo",
  });

  const handleChange = (e) => {
    if (e.target.name === "genres") {
      setForm({
        ...form,
        genres: { ...form.genres, [e.target.value]: e.target.checked },
      });
    } else if (e.target.id === "platforms") {
      setForm({
        ...form,
        [e.target.id]: {
          ...form.platforms,
          [e.target.value]: e.target.value,
        },
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
    setErrors(validateForm(form));
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  };

  function handleSubmit() {
    const genres = [];
    for (const key in form.genres) {
      if (form.genres[key]) {
        genres.push(parseInt(key));
      }
    }
    const platforms = Object.values(form.platforms);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ ...form, genres, platforms }),
      redirect: "follow",
    };

    fetch(
      "https://deploy-production-962d.up.railway.app/videogames/videogames",
      requestOption
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};

/* 
  function handleChangeGenres(e) {
    setCheckedItems({
      ...checkedItems,
      [e.target.value]: e.target.checked,
    });
  }
*/
