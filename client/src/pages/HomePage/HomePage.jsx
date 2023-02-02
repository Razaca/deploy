import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGames, setGenres } from "../../store/actions";
import { useEffect, useState } from "react";
import s from "./HomePage.module.css";

import SearchPanel from "../../components/SearchPanel/SearchPanel";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Board from "../../components/Board/Board";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  const [show, setShow] = useState("all");
  const [paginate, setPaginate] = useState(false);
  const { search, videogames, pages, genres, recents } = useSelector(
    (store) => store
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePaginate() {
    setPaginate(!paginate);
  }

  useEffect(() => {
    if (videogames.length === 0) {
      dispatch(
        getGames(
          `https://deploy-production-962d.up.railway.app/videogames?page=1`
        )
      );
    }
    if (genres.length === 0) {
      dispatch(setGenres());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videogames]);

  return (
    <div className={s.HomePage}>
      <Title />
      <Button fn={() => navigate("/create")}>Crear Juego</Button>
      <SearchPanel setShow={setShow} handlePaginate={handlePaginate} />
      <Board
        show={show}
        setShow={setShow}
        search={search}
        videogames={videogames}
        pages={pages}
        recents={recents}
        paginate={paginate}
        handlePaginate={handlePaginate}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
