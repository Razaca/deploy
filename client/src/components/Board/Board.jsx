import Cards from "../Cards/Cards";
import s from "./Board.module.css";

const Board = ({
  show,
  setShow,
  search,
  videogames,
  pages,
  recents,
  paginate,
  handlePaginate,
}) => {
  return (
    <div className={s.Board}>
      <div className={s.buttons}>
        <span
          className={show === "all" ? s.active : ""}
          onClick={() => setShow("all")}
        >
          todos
        </span>
        <span
          className={show === "search" ? s.active : ""}
          onClick={() => setShow("search")}
        >
          busqueda
        </span>
        <span
          className={show === "new" ? s.active : ""}
          onClick={() => setShow("new")}
        >
          nuevos
        </span>
      </div>

      <div className={s.cards}>
        {show === "search" && search && search.length && (
          <Cards games={search} handlePaginate={handlePaginate} />
        )}
        {show === "all" && videogames.length && (
          <Cards
            games={videogames}
            pages={pages}
            paginate={paginate}
            show={show}
            handlePaginate={handlePaginate}
          />
        )}
        {show === "new" && recents.length && <Cards games={recents} />}
      </div>
    </div>
  );
};

export default Board;
