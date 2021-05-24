import { useState } from "react";
import styles from "./Watchlater.module.css";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import VideoList from "../../components/VideoList/VideoList";
import { useAuth } from "../../contexts/AuthProvider";
import { useModal } from "../../contexts/ModalProvider";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import generateThumbnail from "../../utils/generateThumbnail";

const Watchlater = () => {
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const { userState } = useAuth();
  const [modalData, setModalData] = useState({
    vId: "",
  });

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setDeleteModalVisibility("show");
  };
  const watchLaterThumbnail = userState.watchlater?.map(
    (video) => video._id
  )[0];

  if (!("watchlater" in userState)) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }
  return (
    <div className={styles.watchlaterVideolist}>
      <DefaultWithoutSearch>
        <div className={styles.watchlaterDetails}>
          <div className={styles.watchlaterTitle}>
            <strong>Watch Later</strong>
          </div>
          {userState.watchlater?.length > 0 ? (
            <div className={styles.watchlaterVideosCount}>
              {userState.watchlater.length} videos
            </div>
          ) : (
            <div>There are no videos in this playlist yet.</div>
          )}
        </div>
        {isDeleteModalVisible === "show" && (
          <DeleteModal type="REMOVE_FROM_WATCH_LATER" {...modalData} />
        )}
        <div className="playlist-bar">
          <div className={styles.watchlaterTitle}>
            <div className={styles.watchlaterImage}>
              <img
                className="image"
                src={generateThumbnail(watchLaterThumbnail)}
                alt=""
              />
            </div>
            <strong>Watch Later</strong>
          </div>
          {userState.watchlater?.length > 0 ? (
            <div className={`${styles.watchlaterVideosCount} info__grey`}>
              <small>
                {userState.watchlater.length}{" "}
                {userState.watchlater.length > 1 ? "videos" : "video"}
              </small>
            </div>
          ) : (
            <div>There are no videos in this playlist yet.</div>
          )}
        </div>
        {userState.watchlater?.map(({ _id, title, channel }) => (
          <VideoList
            key={_id}
            vId={_id}
            title={title}
            channel={channel}
            onOptionClick={handleOptionClick}
          />
        ))}
      </DefaultWithoutSearch>
    </div>
  );
};
export default Watchlater;
