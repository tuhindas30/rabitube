import { useState } from "react";
import styles from "./SaveVideoForm.module.css";
import { useWatchlater } from "../../contexts/WatchlaterProvider";
import { useModal } from "../../contexts/ModalProvider";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";

const SaveVideoForm = ({ setModalFormType }) => {
  const { modalData } = useModal();
  const { addToWatchlater } = useWatchlater();
  const [isLoading, setLoading] = useState(false);
  const handleSaveToWatchlater = async (videoId) => {
    setLoading(true);
    await addToWatchlater(videoId);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => handleSaveToWatchlater(modalData)}
        className={`btn secondary ${styles.saveButton}`}
        disabled={isLoading}>
        {isLoading ? (
          <Loader style={{ width: "1.2rem", height: "1.2rem" }} />
        ) : (
          "Save to Watch Later"
        )}
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
