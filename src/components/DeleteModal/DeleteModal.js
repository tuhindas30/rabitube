import { useModal } from "../../contexts/ModalProvider";
import styles from "./DeleteModal.module.css";
import axios from "axios";
import showToast from "../../utils/showToast";

const DeleteModal = ({ type, url, dispatcher, vId, pId }) => {
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();

  const handleRemoveBtn = async () => {
    setDeleteModalVisibility("hide");
    showToast("Removing video ...");
    try {
      const { data } = await axios.delete(`${url}/${vId}`);
      if (data.status === "SUCCESS") {
        dispatcher({
          type: type,
          payload: { vId, pId },
        });
        showToast("Video removed");
      }
    } catch (err) {
      console.log(err);
      showToast("Something went wrong. Please try again");
    }
  };

  return (
    <>
      <div
        className={
          isDeleteModalVisible === "show" ? "modal-overlay show" : "hide"
        }></div>
      <div
        className={
          isDeleteModalVisible === "show"
            ? `modal ${styles.modalSmall} show`
            : "hide"
        }>
        <div>Are you sure remove the video? </div>
        <div className={styles.modalActions}>
          <div onClick={() => setDeleteModalVisibility("hide")}>
            <strong>CANCEL</strong>
          </div>
          <div onClick={handleRemoveBtn}>
            <strong>REMOVE</strong>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteModal;
