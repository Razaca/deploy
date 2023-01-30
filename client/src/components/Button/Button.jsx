import s from "./Button.module.css";

const Button = ({ children, fn }) => {
  return (
    <button onClick={() => fn()} className={s.Button}>
      {children}
    </button>
  );
};

export default Button;
