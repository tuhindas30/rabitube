import "../assests/css/videolistitem.css";
import { Link } from "react-router-dom";
import generateThumbnail from "../utils/generateThumbnail";

const VideoListItem = ({
  v_id,
  avatar,
  title,
  views,
  channel,
  postedOn,
  onOptionClick,
}) => {
  const handleShowModal = () => {
    if (typeof onOptionClick === "function")
      onOptionClick({
        v_id,
        avatar,
        title,
        views,
        channel,
        postedOn,
        onOptionClick,
      });
  };

  return (
    <div className="video--item">
      <Link className="link" to={`/video/${v_id}`}>
        <img className="image" src={generateThumbnail(v_id)} alt="thumbnail" />
      </Link>
      <div className="item--info-container">
        <Link className="link" to={`/video/${v_id}`}>
          <div className="info--avatar">
            <div className="avatar">
              <img className="image round" src={avatar} alt="avatar" />
            </div>
          </div>
        </Link>
        <Link className="link" to={`/video/${v_id}`}>
          <div className="info--detail-container">
            <p className="detail--title">
              <strong>{title}</strong>
            </p>
            <p className="detail-extra">
              <span>{channel}</span>
              <i className="bi bi-dot"></i>
              <span>{views} views</span>
              <i className="bi bi-dot"></i>
              {postedOn}
            </p>
          </div>
        </Link>
        <div onClick={handleShowModal} className="option-menu--container">
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
    </div>
  );
};
export default VideoListItem;
