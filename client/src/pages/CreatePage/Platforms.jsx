import { useState } from "react";
import s from "./CreatePage.module.css";

const Platforms = ({ handleChange, platforms }) => {
  const [count, setCount] = useState(1);

  const selects = [];
  for (let i = 0; i < count; i++) {
    selects.push(
      <select onChange={handleChange} name={i} key={i} id={"platforms"}>
        <option value="">---</option>
        {platforms.map((el, i) => (
          <option key={i} value={el}>
            {el}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className={s.Platforms}>
      {selects}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default Platforms;
