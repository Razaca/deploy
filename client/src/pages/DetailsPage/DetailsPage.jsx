import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./DetailsPage.module.css";

const DetailsPage = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`).then((res) => {
      setGame(res.data.game.data);
      console.log(game);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
