import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGames, setGenres } from "../../store/actions";

import Title from "../../components/Title/Title.jsx";
import s from "./InitPage.module.css";

const InitPage = () => {
  const { videogames, genres } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(getGames(`http://localhost:3001/videogames?page=1`));
      dispatch(getGames(`http://localhost:3001/videogames?page=2`));
      dispatch(getGames(`http://localhost:3001/videogames?page=3`));
      dispatch(getGames(`http://localhost:3001/videogames?page=4`));
      dispatch(getGames(`http://localhost:3001/videogames?page=5`));
    }
    if (genres.length === 0) {
      dispatch(setGenres());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onClick={() => navigate("/home")} className={s.InitPage}>
      <Title />
      <span>CLICK PARA CONTINUAR</span>
    </div>
  );
};

export default InitPage;
