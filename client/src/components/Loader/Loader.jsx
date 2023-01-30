import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.Loader}>
      <div className={s.loader}>
        <div className={s.face}>
          <div className={s.circle}></div>
        </div>
        <div className={s.face}>
          <div className={s.circle}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
