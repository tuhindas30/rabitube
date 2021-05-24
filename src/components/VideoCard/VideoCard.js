import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";
import generateThumbnail from "../../utils/generateThumbnail";
import { useAuth } from "../../contexts/AuthProvider";

const VideoCard = ({
  vId,
  avatar,
  title,
  duration,
  views,
  channel,
  postedOn,
  onOptionClick,
}) => {
  const { auth } = useAuth();

  const handleShowModal = () => {
    if (auth.isUserLoggedIn) {
      if (typeof onOptionClick === "function")
        onOptionClick({
          vId,
          title,
          duration,
          channel,
        });
    } else {
      alert("You must log in to add video to playlists");
    }
  };

  return (
    <div className={styles.videoItem}>
      <Link className="link" to={`/video/${vId}`}>
        <img className="image" src={generateThumbnail(vId)} alt="thumbnail" />
        <div className={styles.videoDuration}>{duration}</div>
      </Link>
      <div className={styles.itemInfoContainer}>
        <Link className="link" to={`/video/${vId}`}>
          <div className={styles.infoAvatar}>
            <div className={styles.avatar}>
              <img className="image round" src={avatar} alt="avatar" />
            </div>
          </div>
        </Link>
        <Link className="link" to={`/video/${vId}`}>
          <div className={styles.infoDetailContainer}>
            <p className="detail--title">
              <strong>{title}</strong>
            </p>
            <p className={styles.detailExtra}>
              <span>{channel}</span>
              <i className="bi bi-dot"></i>
              <span>{views} views</span>
              <i className="bi bi-dot"></i>
              {postedOn}
            </p>
          </div>
        </Link>
        <div onClick={handleShowModal} className={styles.optionMenuContainer}>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
