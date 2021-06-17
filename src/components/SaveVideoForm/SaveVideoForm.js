import styles from "./SaveVideoForm.module.css";
import { useWatchlater } from "../../contexts/WatchlaterProvider";
import { useModal } from "../../contexts/ModalProvider";

const SaveVideoForm = ({ setModalFormType }) => {
  const { modalData, toggleModalVisibility } = useModal();
  const { addToWatchlater } = useWatchlater();

  const handleSaveToWatchlater = async (videoId) => {
    await addToWatchlater(videoId);
    toggleModalVisibility();
  };

  return (
    <>
      <button
        onClick={() => handleSaveToWatchlater(modalData)}
        className={`btn secondary ${styles.saveButton}`}>
        Save to Watch Later
      </button>
      <button
        onClick={() => setModalFormType("ADD_TO_PLAYLIST")}
        className={`btn secondary ${styles.saveButton}`}>
        Add to Playlist
      </button>
    </>
  );
};

export default SaveVideoForm;
