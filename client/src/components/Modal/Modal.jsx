import { useDispatch } from "react-redux";
import { cleanErrors } from "../../store/actions";
import s from "./Modal.module.css";

const Modal = ({ children, isOpen, closeModal, error = true }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();
  const dispatch = useDispatch();

  function closeAndDeleteError() {
    dispatch(cleanErrors());
    closeModal();
  }

  return (
    <div className={`${s.modal} ${isOpen && s.isOpen}`} onClick={closeModal}>
      <div className={s.modalContainer} onClick={handleModalContainerClick}>
        <button className={s.modalClose} onClick={error ?closeAndDeleteError :closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
