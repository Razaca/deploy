import s from "./Navigate.module.css";
import { useSelector } from "react-redux";

const Navigate = ({ handlePage, page, arrayPages, handlePageByIndex }) => {
  const { loading } = useSelector((store) => store);

  function createIndex(arrayPages) {
    let index = [];
    for (let i = 0; i < arrayPages; i++) {
      index.push(
        <span onClick={() => handlePageByIndex(i)} key={i} className={page === i ?s.active :null}>
          {i + 1}
        </span>
      );
    }
    return index;
  }

  return (
    <div className={s.Navigate}>
      <button
        onClick={() => handlePage(page - 1)}
        disabled={loading || page <= 0 ? true : false}
      >
        Atras
      </button>
      {/* <span>{page + 1}</span> */}

      {createIndex(arrayPages)}

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
