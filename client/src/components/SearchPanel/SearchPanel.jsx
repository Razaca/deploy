import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findGames,

  searchByGenre,
} from "../../store/actions";
import Button from "../Button/Button";
import s from "./SearchPanel.module.css";

const SearchPanel = ({ setShow, handlePaginate }) => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const { genres } = useSelector((store) => store);

  function handleSearch() {
    dispatch(findGames(input));
    setShow("search");
  }

  function handleSelect(e) {
    dispatch(searchByGenre(e.target.value));
    setShow("search");
  }

  return (
    <div className={s.SearchPanel}>
      <input
        onChange={(e) => setInput(e.target.value)}
        className={s.inputText}
        type="text"
        placeholder="NOMBRE DEL JUEGO"
        value={input}
      />
      <Button fn={handleSearch}>Buscar</Button>
      <div>
        <label htmlFor="">genre:</label>
        {genres.length && (
          <select onChange={(e) => handleSelect(e)} name="genre">
            <option value="---">---</option>
            {genres.map((el, i) => (
              <option value={el.name} key={i}>
                {el.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
