import { useNavigate } from "react-router-dom";
import s from "./ToHome.module.css";

const ToHome = () => {
  const navigate = useNavigate();

  function toHome() {
    navigate("/home");
    window.scrollTo(0, 0);
  }

  return (
    <div className={s.arrowContainer}>
      <i className={s.arrow} onClick={toHome}></i>
    </div>
  );
};

export default ToHome;
