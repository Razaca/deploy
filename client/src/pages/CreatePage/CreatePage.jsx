import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGenres } from "../../store/actions";
import { useForm } from "./useForm";
import s from "./CreatePage.module.css";

import { platformsArray } from "./platformsArray";
import Platforms from "./Platforms";
import validation from "./validate";

import Button from "../../components/Button/Button";
import Title from "../../components/Title/Title";

const initialForm = {
  name: "",
  description: "",
  image: "",
  released: "",
  rating: 0,
  genres: {},
  platforms: {},
};

const CreatePage = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((store) => store);

  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validation
  );

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(setGenres());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genres]);

  return (
    <div className={s.CreatePage}>
      <Title />
      <h3>Crear juego</h3>
      <div className={s.form}>
        {errors.name && errors.name}
        <input
          className={errors.name ? s.error : null}
          type="text"
          name="name"
          placeholder="Escribe un nombre"
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.name}
          required
        />

        {errors.description && errors.description}
        <textarea
          onBlur={handleBlur}
          onChange={handleChange}
          className={errors.description ? s.error : null}
          placeholder="Ingresa una Descripcion"
          value={form.description}
          name="description"
          rows="10"
        ></textarea>

        {errors.image && errors.image}
        <input
          className={errors.image ? s.error : null}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Ingresa URL con la imagen del juego"
          value={form.image}
          type="text"
          name="image"
        />

        {errors.released && errors.released}
        <input
          className={errors.released ? s.error : null}
          onBlur={handleBlur}
          onChange={handleChange}
          name="released"
          type="date"
        />

        {errors.rating && errors.rating}
        <input
          className={errors.rating ? s.error : null}
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.rating}
          name="rating"
          type="number"
          placeholder="rating"
        />

        {errors.genres && errors.genres}
        <div className={s.genres}>
          {genres &&
            genres.map((el, i) => (
              <div key={i}>
                <label htmlFor={el.name}>{el.name}</label>
                <input
                  onChange={(e) => handleChange(e)}
                  type="checkbox"
                  name="genres"
                  value={el.id}
                  id={el.name}
                />
              </div>
            ))}
        </div>

        {errors.platforms && errors.platforms}
        <Platforms platforms={platformsArray} handleChange={handleChange} />

        <Button fn={() => handleSubmit()}>Agregar</Button>
        <Button fn={() => console.log(form)}>log</Button>
      </div>
    </div>
  );
};

export default CreatePage;
