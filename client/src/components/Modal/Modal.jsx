import { useDispatch } from "react-redux";
import { cleanErrors } from "../../store/actions";
import s from "./Modal.module.css";

const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  const dispatch = useDispatch();

  function closeAndDeleteError() {
    closeModal();
    dispatch(cleanErrors());
  }

  return (
    <div className={`${s.modal} ${isOpen && s.isOpen}`} onClick={closeModal}>
      <div className={s.modalContainer} onClick={handleModalContainerClick}>
        <button className={s.modalClose} onClick={closeAndDeleteError}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
