import { useModal } from "../../contexts/ModalProvider";
import styles from "./Liked.module.css";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";
import VideoList from "../../components/VideoList/VideoList";
import generateThumbnail from "../../utils/generateThumbnail";
import { useLike } from "../../contexts/LikeProvider";
import { Link } from "react-router-dom";
import { ReactComponent as EmptyVideosSvg } from "../../assets/images/EmptyVideosImage.svg";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";

const Liked = () => {
  const { isLikeLoading, likeState, removeFromLikedPlaylist } = useLike();
  const { isModalVisible, setModalData, toggleModalVisibility } = useModal();
  const likeThumbnail = likeState.map(({ video }) => video._id)[0];

  const handleOptionClick = (videoId) => {
    setModalData(videoId);
    toggleModalVisibility();
  };

  const handleRemoveVideo = async (videoId) => {
    await removeFromLikedPlaylist(videoId);
    toggleModalVisibility();
  };

  if (isLikeLoading) {
    return (
      <div className="overlay">
        <Loader />
      </div>
    );
  }

  if (likeState.length === 0) {
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
    <div className={styles.likedVideos}>
      <div className={styles.playlistHeader}>
        <div style={{ fontWeight: "bold" }}>Liked Videos</div>
        <div style={{ color: "var(--rb-dark-grey)", fontSize: "1.2rem" }}>
          {likeState.length} {likeState.length > 1 ? "videos" : "video"}
        </div>
      </div>
      <div className="playlist-bar">
        <img
          className="image"
          src={generateThumbnail(likeThumbnail)}
          alt="video thumbnail"
        />
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          Liked Videos
        </div>
        <div className="grey-text">
          {likeState.length} {likeState.length > 1 ? "videos" : "video"}
        </div>
      </div>
      {likeState.map(({ video }) => (
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

export default Liked;
