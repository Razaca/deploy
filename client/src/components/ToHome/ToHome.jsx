import { Link } from "react-router-dom";
import s from "./ToHome.module.css";

const ToHome = () => {
  return (
    <div className={s.arrowContainer}>
      <Link to={"/home"}>
        <i className={s.arrow}></i>
      </Link>
    </div>
  );
};

export default ToHome;
