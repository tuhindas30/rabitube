import { useParams } from "react-router";
import VideoList from "../../components/VideoList/VideoList";
import { useModal } from "../../contexts/ModalProvider";
import generateThumbnail from "../../utils/generateThumbnail";
import styles from "./PlaylistedVideos.module.css";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import { Link } from "react-router-dom";
import { ReactComponent as EmptyVideosSvg } from "../../assets/images/EmptyVideosImage.svg";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";

const PlayListedVideos = () => {
  const { isPlaylistLoading, playlistState, removeFromPlaylist } =
    usePlaylist();
  const { isModalVisible, setModalData, toggleModalVisibility } = useModal();
  const { playlistId } = useParams();
  const playlist = playlistState.find(
    (playlist) => playlist._id === playlistId
  );

  const playlistThumbnail = playlist?.items.map(({ video }) => video._id)[0];

  const handleOptionClick = (videoId) => {
    setModalData(videoId);
    toggleModalVisibility();
  };

  const handleRemoveVideo = async (videoId) => {
    await removeFromPlaylist(playlistId, videoId);
    toggleModalVisibility();
  };

  if (isPlaylistLoading) {
    return (
      <div className="overlay">
        <Loader />
      </div>
    );
  }

  if (playlist?.items.length === 0) {
    return (
      <div className={styles.noVideosFound}>
        <EmptyVideosSvg width="80%" />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "1rem 2rem",
          }}>
          No videos found!
        </p>
        <Link to="/" className="btn links btn-link">
          Add videos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.playlistedVideos}>
      <div className={styles.playlistHeader}>
        <div style={{ fontWeight: "bold" }}>{playlist?.title}</div>
        <div style={{ color: "var(--rb-dark-grey)", fontSize: "1.2rem" }}>
          {playlist?.items.length}{" "}
          {playlist?.items.length > 1 ? "videos" : "video"}
        </div>
      </div>
      <div className="playlist-bar">
        <img
          className="image"
          src={generateThumbnail(playlistThumbnail)}
          alt="video thumbnail"
        />
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {playlist?.title}
        </div>
        <div className="grey-text">
          {playlist?.items.length}{" "}
          {playlist?.items.length > 1 ? "videos" : "video"}
        </div>
      </div>
      {playlist?.items.map(({ video }) => (
        <VideoList
          key={video._id}
          video={video}
          onOptionClick={handleOptionClick}
        />
      ))}
      {isModalVisible && (
        <Modal handleClose={toggleModalVisibility}>
          <ModalForm
            formType="REMOVE_VIDEO"
            handleRemoveVideo={handleRemoveVideo}
          />
        </Modal>
      )}
    </div>
  );
};
export default PlayListedVideos;
