import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import s from "./DetailsPage.module.css";

const DetailsPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`)
      .then((res) => {
        setGame(res.data.game.data);
        console.log(res.data.game.data)
      })
      .catch((error) => setError(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return (
      <div className={s.DetailsPage}>
        <div className={s.border}>
          <h2>Ha ocurrido un error.</h2>
          <Link to="/home">volver a la pagina principal</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={s.DetailsPage}>
      <div className={s.border}>
        <img src={game.image} alt={game.name} />

        <h2>{game.name}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: game.description }}
          className={s.description}
        ></div>
      </div>
    </div>
  );
};

export default DetailsPage;
