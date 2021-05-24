import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useModal } from "../../contexts/ModalProvider";
import styles from "./Liked.module.css";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import VideoList from "../../components/VideoList/VideoList";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import generateThumbnail from "../../utils/generateThumbnail";

const Liked = () => {
  const { userState } = useAuth();
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const [modalData, setModalData] = useState({
    vId: "",
  });
  const likeThumbnail = userState.liked?.map((video) => video._id)[0];

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setDeleteModalVisibility("show");
  };

  if (!("liked" in userState)) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }
  return (
    <div className={styles.likedItems}>
      <DefaultWithoutSearch>
        <div className={styles.likedDetails}>
          <div className={styles.likedTitle}>
            <strong>Liked Videos</strong>
          </div>
          {userState.liked?.length > 0 ? (
            <div className="info__grey">
              <small>
                {userState.liked?.length}{" "}
                {userState.liked?.length > 1 ? "videos" : "video"}
              </small>
            </div>
          ) : (
            <div>There are no videos in this playlist yet.</div>
          )}
        </div>
        <div className="playlist-bar">
          <div className={styles.likedTitle}>
            <div className={styles.playlistImage}>
              <img
                className="image"
                src={generateThumbnail(likeThumbnail)}
                alt=""
              />
            </div>
            <strong>Liked Videos</strong>
            {userState.liked?.length > 0 ? (
              <div className="info__grey">
                <small>
                  {userState.liked?.length}{" "}
                  {userState.liked?.length > 1 ? "videos" : "video"}
                </small>
              </div>
            ) : (
              <div>There are no videos in this playlist yet.</div>
            )}
          </div>
        </div>
        <div className="liked--videos">
          {isDeleteModalVisible === "show" && (
            <DeleteModal type="REMOVE_FROM_LIKED_PLAYLIST" {...modalData} />
          )}

          {userState.liked?.map(({ _id, title, channel }) => (
            <VideoList
              key={_id}
              vId={_id}
              title={title}
              channel={channel}
              onOptionClick={handleOptionClick}
            />
          ))}
        </div>
      </DefaultWithoutSearch>
    </div>
  );
};

export default Liked;
