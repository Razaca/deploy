import React, { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGames, setLoading } from "../../store/actions";
import { splitArray } from "../../helpers";
import s from "./Cards.module.css";
//import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Navigate from "../Navigate/Navigate";
import Button from "../Button/Button";
import OrderButtons from "../OrderButtons/OrderButtons";
const Card = lazy(() => import("../Card/Card"));

const Cards = ({ games, pages, paginate = false, show, handlePaginate }) => {
  const { loading } = useSelector((store) => store);
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
            split[page].map((el, i) => (
              <div key={i}>
                <Suspense fallback={<Loader />}>
                  <Card game={el} />
                </Suspense>
              </div>
            ))
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
            games.map((el, i) => (
              <div key={i}>
                <Suspense fallback={<Loader />}>
                  <Card game={el} />
                </Suspense>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
        {show === "all" && (
          <Button
            fn={() => {
              dispatch(setLoading())
              dispatch(
                getGames(`http://localhost:3001/videogames?page=${pages + 1}`)
              );
            }}
            disabled={loading ? true : false}
          >
            Cargar mas
          </Button>
        )}
      </>
    );
  }
};

export default Cards;
