import s from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={s.Footer}>
      <h2>
        Projecto Individual
        <span>
          <span>SOY</span>
          <span>HENRY</span>
        </span>
      </h2>
      <h3>
        Desarrollado por <span>Renzo Cervantes</span>
      </h3>
    </footer>
  );
};

export default Footer;
