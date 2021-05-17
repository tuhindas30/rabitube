import generateThumbnail from "../../utils/generateThumbnail";
import truncate from "../../utils/truncate";
import styles from "./VideoList.module.css";
import { Link } from "react-router-dom";

const VideoList = ({ vId, title, channel, onOptionClick }) => {
  const handleShowModal = () => {
    if (typeof onOptionClick === "function")
      onOptionClick({
        vId,
      });
  };

  return (
    <div key={vId} className={styles.videosContainer}>
      <Link to={`/video/${vId}`} className="link">
        <div>
          <img className="image" src={generateThumbnail(vId)} alt="" />
        </div>
      </Link>
      <div className={`${styles.videoInfo} ${styles.containerGrid}`}>
        <Link to={`/video/${vId}`} className="link">
          <div>
            <p className={styles.infoTitle}>
              <strong>{truncate(title, 40)}</strong>
            </p>
            <small className="info__grey">{channel}</small>
          </div>
        </Link>
        <div
          onClick={handleShowModal}
          className={`${styles.containerGrid} ${styles.fitContent}`}>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
    </div>
  );
};
export default VideoList;
