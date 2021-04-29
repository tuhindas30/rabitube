import { useModal } from "../contexts/ModalProvider";
import "../assests/css/deletemodal.css";

const DeleteModal = ({ dispatcher, v_id, p_id }) => {
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();

  return (
    <>
      <div
        className={
          isDeleteModalVisible === "show" ? "modal-overlay show" : "hide"
        }
      ></div>
      <div
        className={
          isDeleteModalVisible === "show" ? "modal modal__small show" : "hide"
        }
      >
        <div>Are you sure remove the video? </div>
        <div className="modal-actions">
          <div onClick={() => setDeleteModalVisibility("hide")}>
            <strong>CANCEL</strong>
          </div>
          <div
            onClick={() =>
              dispatcher({
                type: "REMOVE",
                payload: { v_id, p_id, setDeleteModalVisibility },
              })
            }
          >
            <strong>REMOVE</strong>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteModal;
