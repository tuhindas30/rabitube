import { useState } from "react";
import { useWatchlater } from "../../contexts/WatchlaterProvider";
import { useModal } from "../../contexts/ModalProvider";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";

import styles from "./DeleteForm.module.css";

const DeleteForm = ({ setModalFormType, onRemove }) => {
  const { modalData } = useModal();
  const { addToWatchlater } = useWatchlater();
  const [loader, setLoader] = useState({ add: false, delete: false });

  const handleSaveToWatchlater = async (videoId) => {
    setLoader((state) => ({ ...state, add: true }));
    await addToWatchlater(videoId);
    setLoader((state) => ({ ...state, add: false }));
  };

  const handleRemove = async (videoId) => {
    setLoader((state) => ({ ...state, delete: true }));
    await onRemove(videoId);
    setLoader((state) => ({ ...state, delete: false }));
  };

  return (
    <>
      <button
        onClick={() => handleSaveToWatchlater(modalData)}
        className={`btn secondary ${styles.saveButton}`}>
        {loader.add ? (
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
      <button
        onClick={() => handleRemove(modalData)}
        className={`btn secondary ${styles.saveButton}`}>
        {loader.delete ? (
          <Loader style={{ width: "1.2rem", height: "1.2rem" }} />
        ) : (
          "Remove Video"
        )}
      </button>
    </>
  );
};

export default DeleteForm;
