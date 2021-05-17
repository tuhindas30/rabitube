import { useState } from "react";
import { BASE_URL } from "../../api/helper";
import styles from "./Watchlater.module.css";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import VideoList from "../../components/VideoList/VideoList";
import { useAuth } from "../../contexts/AuthProvider";
import { useModal } from "../../contexts/ModalProvider";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import generateThumbnail from "../../utils/generateThumbnail";

const Watchlater = () => {
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const [modalData, setModalData] = useState({
    vId: "",
  });
  const { userState, userDispatch } = useAuth();
  const url = `${BASE_URL}/users/${userState._id}/watchlater`;

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setDeleteModalVisibility("show");
  };
  const watchLaterThumbnail = userState.watchlater?.map(
    (video) => video._id
  )[0];

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
          <DeleteModal
            type="REMOVE_VIDEO"
            url={url}
            dispatcher={userDispatch}
            {...modalData}
          />
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
