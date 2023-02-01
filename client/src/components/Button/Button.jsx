import s from "./Button.module.css";

const Button = ({ children, fn, disabled }) => {
  return (
    <button onClick={() => fn()} className={s.Button} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
