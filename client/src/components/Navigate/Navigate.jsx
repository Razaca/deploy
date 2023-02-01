import s from "./Navigate.module.css";
import { useSelector } from "react-redux";

const Navigate = ({ handlePage, page }) => {
  const { loading } = useSelector((store) => store);
  
  return (
    <div className={s.Navigate}>
      <button
        onClick={() => handlePage(page - 1)}
        disabled={loading || page <= 0 ? true : false}
      >
        Atras
      </button>
      <span>{page + 1}</span>
      <button
        onClick={() => handlePage(page + 1)}
        disabled={loading ? true : false}
      >
        Adelante
      </button>
    </div>
  );
};

export default Navigate;
