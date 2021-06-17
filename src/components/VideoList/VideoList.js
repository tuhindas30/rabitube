import generateThumbnail from "../../utils/generateThumbnail";
import truncate from "../../utils/truncate";
import styles from "./VideoList.module.css";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useHistory } from "../../contexts/HistoryProvider";

const VideoList = ({ video, onOptionClick }) => {
  const { addToHistory } = useHistory();

  const handleVideoClick = async (videoId) => {
    await addToHistory(videoId);
  };

  return (
    <div className={styles.videoContainer}>
      <Link
        onClick={() => handleVideoClick(video._id)}
        to={`/video/${video._id}`}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        className={`link`}>
        <img
          className="image"
          src={generateThumbnail(video._id)}
          alt="video thumbnail"
        />
        <div style={{ marginLeft: "0.5rem" }}>
          <div style={{ fontWeight: "bold" }}>{truncate(video.title, 40)}</div>
          <div className="grey-text">{video.channelName}</div>
        </div>
      </Link>
      <div
        onClick={() => onOptionClick(video._id)}
        className={styles.optionMenuContainer}>
        <BsThreeDotsVertical />
      </div>
    </div>
  );
};
export default VideoList;
