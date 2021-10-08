import styles from "./VideoCard.module.css";
import { Link } from "react-router-dom";
import generateThumbnail from "../../utils/generateThumbnail";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthProvider";
import { useHistory } from "../../contexts/HistoryProvider";
import showToast from "../../utils/showToast";

const VideoCard = ({ video, onOptionClick }) => {
  const { token } = useAuth();
  const { addToHistory } = useHistory();

  const handleVideoClick = async (videoId) => {
    await addToHistory(videoId);
  };

  return (
    <div className={styles.videoItem}>
      <Link
        onClick={() => handleVideoClick(video._id)}
        to={`/video/${video._id}`}
        className="link">
        <img
          className="image"
          src={generateThumbnail(video._id)}
          alt="video thumbnail"
        />
        <div className={styles.videoDuration}>{video.duration}</div>
      </Link>
      <div className={styles.itemInfoContainer}>
        <Link
          onClick={() => handleVideoClick(video._id)}
          to={`/video/${video._id}`}
          className="link"
          style={{
            display: "grid",
            gridTemplateColumns: "0.3fr 1fr",
            width: "100%",
          }}>
          <div className={styles.avatar}>
            <img className="image round" src={video.avatarUrl} alt="avatar" />
          </div>
          <div style={{ padding: "0.5rem" }}>
            <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
              {video.title}
            </p>
            <p className="grey-text">{video.channelName}</p>
            <p className="grey-text">{video.viewCount} views</p>
            <p className="grey-text">{video.uploadDate}</p>
          </div>
        </Link>
        <div
          onClick={() =>
            token
              ? onOptionClick(video._id)
              : showToast("Sign-in to view more options")
          }
          className={styles.optionMenuContainer}>
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};
export default VideoCard;
