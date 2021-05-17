import { useState } from "react";
import { useParams } from "react-router";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import VideoList from "../../components/VideoList/VideoList";
import { useModal } from "../../contexts/ModalProvider";
import generateThumbnail from "../../utils/generateThumbnail";
import styles from "./PlaylistedVideos.module.css";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import { useAuth } from "../../contexts/AuthProvider";
import { BASE_URL } from "../../api/helper";

const PlayListedVideos = () => {
  const { userState, userDispatch } = useAuth();
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const { pId } = useParams();
  const [modalData, setModalData] = useState({
    vId: "",
  });
  const url = `${BASE_URL}/users/${userState._id}/playlists/${pId}`;
  const playlist = userState.playlists?.find(
    (playlist) => playlist._id === pId
  );

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setDeleteModalVisibility("show");
  };

  const playLisThumbnail = playlist?.videos.map((video) => video._id)[0];

  return (
    <>
      <DefaultWithoutSearch>
        {isDeleteModalVisible === "show" && (
          <DeleteModal
            type="DELETE_FROM_PLAYLIST"
            url={url}
            dispatcher={userDispatch}
            {...modalData}
            pId={pId}
          />
        )}
        <div className={styles.playlistedVideos}>
          <div className={styles.playlistDetails}>
            <div className={styles.playlistTitle}>
              <strong>{playlist?.title}</strong>
            </div>
            {playlist?.videos.length > 0 ? (
              <div className="info__grey">
                <small>
                  {playlist.videos.length}{" "}
                  {playlist.videos.length > 1 ? "videos" : "video"}
                </small>
              </div>
            ) : (
              <div>There are no videos in this playlist yet.</div>
            )}
          </div>
          <div className="playlist-bar">
            <div className={styles.playlistTitle}>
              <div className={styles.playlistImage}>
                <img
                  className="image"
                  src={generateThumbnail(playLisThumbnail)}
                  alt=""
                />
              </div>
              <strong>{playlist?.title}</strong>
              {playlist?.videos.length > 0 ? (
                <div className="info__grey">
                  {playlist.videos.length}{" "}
                  {playlist.videos.length > 1 ? "videos" : "video"}
                </div>
              ) : (
                <div>There are no videos in this playlist yet.</div>
              )}
            </div>
          </div>

          {playlist?.videos.map(({ _id, title, channel }) => (
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
    </>
  );
};
export default PlayListedVideos;
