import { useModal } from "../../contexts/ModalProvider";
import styles from "./DeleteModal.module.css";
import showToast from "../../utils/showToast";
import { useLike } from "../../hooks/useLike";
import { useWatchlater } from "../../hooks/useWatchlater";
import { usePlaylist } from "../../hooks/usePlaylist";
import { useAuth } from "../../contexts/AuthProvider";

const DeleteModal = ({ type, vId, pId }) => {
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const { userDispatch } = useAuth();
  const { removeFromLike } = useLike(userDispatch);
  const { removeFromWatchlater } = useWatchlater(userDispatch);
  const { removeFromPlaylist } = usePlaylist(userDispatch);

  const handleRemoveBtn = async () => {
    setDeleteModalVisibility("hide");
    if (type === "REMOVE_FROM_LIKED_PLAYLIST") {
      showToast("Removing video from liked playlist ...");
      try {
        await removeFromLike(vId);
        showToast("Video removed from liked playlist");
      } catch (err) {
        console.log(err);
        showToast("Something went wrong. Please try again");
      }
    } else if (type === "REMOVE_FROM_WATCH_LATER") {
      showToast("Removing video from watch later ...");
      try {
        await removeFromWatchlater(vId);
        showToast("Video removed from watch later");
      } catch (err) {
        console.log(err);
        showToast("Something went wrong. Please try again");
      }
    } else if (type === "REMOVE_FROM_PLAYLIST") {
      showToast("Removing video from playlist ...");
      try {
        await removeFromPlaylist(pId, vId);
        showToast("Video removed from playlist");
      } catch (err) {
        console.log(err);
        showToast("Something went wrong. Please try again");
      }
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
