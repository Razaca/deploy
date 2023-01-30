import { useState } from "react";
import { setGenres } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import s from "./CreatePage.module.css";

const CreatePage = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((store) => store);

  const [game, setGame] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: 0,
    platforms: ["pc"],
  });
  const [checkedItems, setCheckedItems] = useState({});

  function handleChange(e) {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeGenres(e) {
    setCheckedItems({
      ...checkedItems,
      [e.target.value]: e.target.checked,
    });
  }

  function handleSubmit() {
    const genres = [];
    for (const key in checkedItems) {
      if (checkedItems[key]) {
        genres.push(parseInt(key));
      }
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ ...game, genres }),
      redirect: "follow",
    };

    fetch("deploy-production-962d.up.railway.app/videogames", requestOption)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(setGenres());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres]);

  return (
    <div className={s.CreatePage}>
      <div onSubmit={(e) => {}} className={s.form}>
        <input
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa el nombre del juego"
          value={game.name}
          type="text"
          name="name"
        />

        <textarea
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa una Descripcion"
          value={game.description}
          name="description"
          rows="10"
        ></textarea>

        <input
          onChange={(e) => handleChange(e)}
          placeholder="Ingresa URL con la imagen del juego"
          value={game.image}
          type="text"
          name="image"
        />

        <input onChange={(e) => handleChange(e)} name="released" type="date" />

        <input
          onChange={(e) => handleChange(e)}
          value={game.rating}
          name="rating"
          type="number"
        />

        <div className={s.genres}>
          {genres &&
            genres.map((el, i) => (
              <div key={i}>
                <label htmlFor={el.name}>{el.name}</label>
                <input
                  onChange={(e) => handleChangeGenres(e)}
                  type="checkbox"
                  name="genres"
                  value={el.id}
                  id={el.name}
                />
              </div>
            ))}
        </div>

        <Button fn={() => handleSubmit()}>Agregar</Button>
      </div>
    </div>
  );
};

export default CreatePage;
