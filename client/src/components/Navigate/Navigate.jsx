import s from "./Navigate.module.css";

const Navigate = ({ handlePage, page }) => {
  return (
    <div className={s.Navigate}>
      <div onClick={() => handlePage(page - 1)}>Atras</div>
      <span>{page + 1}</span>
      <div onClick={() => handlePage(page + 1)}>Adelante</div>
    </div>
  );
};

export default Navigate;
