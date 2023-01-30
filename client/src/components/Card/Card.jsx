import { useNavigate } from "react-router-dom";
import s from "./Card.module.css";

const Card = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/${game.id}`)} className={s.Card}>
      <img src={game.image} alt={game.name} />
      <div className={s.info}>
        <div className={s.cube}>
          <span className={`${s.side} ${s.top}`}>
            <div>{game.rating}</div>
            <div className={s.genres}>
              {game.genres
                .map((el) => el.name)
                .map((el, i) => (
                  <span key={i}>{el}</span>
                ))}
            </div>
          </span>
          <span className={`${s.side} ${s.front}`}>{game.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
