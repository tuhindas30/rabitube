import { useModal } from "../../contexts/ModalProvider";
import styles from "./History.module.css";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";
import VideoList from "../../components/VideoList/VideoList";
import generateThumbnail from "../../utils/generateThumbnail";
import { Link } from "react-router-dom";
import { ReactComponent as EmptyVideosSvg } from "../../assets/images/EmptyVideosImage.svg";
import { IoMdTrash } from "react-icons/io";
import { useHistory } from "../../contexts/HistoryProvider";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";

const History = () => {
  const {
    isHistoryLoading,
    historyState,
    removeFromHistory,
    removeUserHistory,
  } = useHistory();
  const { isModalVisible, setModalData, toggleModalVisibility } = useModal();
  const historyThumbnail = historyState.map(({ video }) => video._id)[0];

  const handleOptionClick = (videoId) => {
    setModalData(videoId);
    toggleModalVisibility();
  };

  const handleRemoveVideo = async (videoId) => {
    await removeFromHistory(videoId);
    toggleModalVisibility();
  };

  const today = new Date().toDateString();
  const lastViewedToday = historyState.filter(
    (video) => video.lastViewed === today
  );

  const lastViewedOthers = historyState.filter(
    (video) => video.lastViewed !== today
  );

  if (isHistoryLoading) {
    return (
      <div className="overlay">
        <Loader />
      </div>
    );
  }

  if (historyState.length === 0) {
    return (
      <div className={styles.noVideosFound}>
        <EmptyVideosSvg width="50%" />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "1rem 2rem",
          }}>
          No videos found!
        </p>
        <Link to="/" className="btn links btn-link">
          Explore videos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.historyVideos}>
      <div className={styles.historyHeader}>
        <div style={{ fontWeight: "bold" }}>History Videos</div>
        <button
          onClick={removeUserHistory}
          className={`btn primary flex-icon ${styles.clearHistoryButton}`}>
          <IoMdTrash style={{ marginRight: "0.5rem" }} /> Clear All
        </button>
      </div>
      <div className="playlist-bar">
        <img
          className="image"
          src={generateThumbnail(historyThumbnail)}
          alt="video thumbnail"
        />
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          History Videos
        </div>
        <div className="grey-text">
          {historyState.length} {historyState.length > 1 ? "videos" : "video"}
        </div>
        <button
          onClick={removeUserHistory}
          className="btn primary"
          style={{ margin: "1rem 0" }}>
          Clear All History
        </button>
      </div>
      {lastViewedToday && <div className={styles.lastViewTitle}>Today</div>}
      {lastViewedToday.length > 0 ? (
        lastViewedToday.map(({ video }) => (
          <VideoList
            key={video._id}
            video={video}
            onOptionClick={handleOptionClick}
          />
        ))
      ) : (
        <div className={styles.emptyLastView}>No videos viewed today!</div>
      )}
      {lastViewedOthers.length > 0 && (
        <div className={styles.lastViewTitle}>Others</div>
      )}
      {lastViewedOthers ? (
        lastViewedOthers.map(({ video }) => (
          <VideoList
            key={video._id}
            video={video}
            onOptionClick={handleOptionClick}
          />
        ))
      ) : (
        <div className={styles.emptyLastView}>
          No videos here. Check out soon!
        </div>
      )}
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

export default History;
