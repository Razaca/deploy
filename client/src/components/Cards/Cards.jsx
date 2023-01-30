import { splitArray } from "../../helpers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGames } from "../../store/actions";
import s from "./Cards.module.css";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Navigate from "../Navigate/Navigate";
import Button from "../Button/Button";
import OrderButtons from "../OrderButtons/OrderButtons";

const Cards = ({ games, pages, paginate = false, show, handlePaginate }) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  let split;
  if (paginate) {
    split = splitArray(games, 15);
  } else {
    split = games;
  }

  function handlePage(op) {
    window.scrollTo(0, 0);
    dispatch(getGames(`http://localhost:3001/videogames?page=${pages + 1}`));
    setPage(op);
  }

  if (paginate) {
    return (
      <>
        <div className={s.gamesCharged}>
          Juegos Cargados: <span>{games.length}</span>
        </div>
        {show === "all" && <OrderButtons />}
        <div>
          <label htmlFor="paginate">Paginas:</label>
          <input onClick={handlePaginate} type="checkbox" />
        </div>
        <Navigate handlePage={handlePage} page={page} />
        <div className={s.Cards}>
          {split.length ? (
            split[page].map((el, i) => <Card game={el} key={i} />)
          ) : (
            <Loader />
          )}
        </div>
        <Navigate handlePage={handlePage} page={page} />
      </>
    );
  } else {
    return (
      <>
        <div className={s.gamesCharged}>
          Juegos Cargados: <span>{games.length}</span>
        </div>
        {show === "all" && <OrderButtons />}
        {show === "all" && (
          <div>
            <label htmlFor="paginate">Paginas:</label>
            <input onClick={handlePaginate} type="checkbox" />
          </div>
        )}
        <div className={s.Cards}>
          {games.length ? (
            games.map((el, i) => <Card game={el} key={i} />)
          ) : (
            <Loader />
          )}
        </div>
        {show === "all" && (
          <Button
            fn={() =>
              dispatch(
                getGames(`http://localhost:3001/videogames?page=${pages + 1}`)
              )
            }
          >
            Cargar mas
          </Button>
        )}
      </>
    );
  }
};

export default Cards;
