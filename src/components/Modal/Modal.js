import styles from "./Modal.module.css";

const Modal = ({ handleClose, children }) => {
  return (
    <>
      <div onClick={handleClose} className="modal-overlay"></div>
      <div className={`modal ${styles.modal}`}>{children}</div>
    </>
  );
};

export default Modal;
