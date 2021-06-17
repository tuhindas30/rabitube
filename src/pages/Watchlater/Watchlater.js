import { useModal } from "../../contexts/ModalProvider";
import styles from "./Watchlater.module.css";
import VideoList from "../../components/VideoList/VideoList";
import generateThumbnail from "../../utils/generateThumbnail";
import { useWatchlater } from "../../contexts/WatchlaterProvider";
import { ReactComponent as EmptyVideoSvg } from "../../assets/images/EmptyVideosImage.svg";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";

const Watchlater = () => {
  const { isModalVisible, setModalData, toggleModalVisibility } = useModal();
  const { isWatchlaterLoading, watchlaterState, removeFromWatchlater } =
    useWatchlater();

  const handleOptionClick = (videoId) => {
    setModalData(videoId);
    toggleModalVisibility();
  };
  const watchlaterThumbnail = watchlaterState.map(({ video }) => video._id)[0];

  const handleRemoveVideo = async (videoId) => {
    await removeFromWatchlater(videoId);
    toggleModalVisibility();
  };

  if (isWatchlaterLoading) {
    return <h1 className="overlay">Loading ...</h1>;
  }

  if (watchlaterState.length === 0) {
    return (
      <div className={styles.noVideosFound}>
        <EmptyVideoSvg width="80%" />
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
    <div className={styles.watchlaterVideolist}>
      <div className={styles.watchlaterHeader}>
        <div style={{ fontWeight: "bold" }}>Watch Later</div>
        <div style={{ color: "var(--rb-dark-grey)", fontSize: "1.2rem" }}>
          {watchlaterState.length}{" "}
          {watchlaterState.length > 1 ? "videos" : "video"}
        </div>
      </div>
      <div className="playlist-bar">
        <img
          className="image"
          src={generateThumbnail(watchlaterThumbnail)}
          alt="video thumbnail"
        />
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Watch Later
        </div>
        <div className="grey-text">
          {watchlaterState.length}{" "}
          {watchlaterState.length > 1 ? "videos" : "video"}
        </div>
      </div>
      {watchlaterState.map(({ video }) => (
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
export default Watchlater;
