import "../assests/css/videolistitem.css";
import generateThumbnail from "../utils/generateThumbnail";
const VideoListItem = ({ id, avatar, title, views, channel, postedOn }) => {
  return (
    <div className="video-item">
      <img className="image" src={generateThumbnail(id)} alt="" />
      <div className="video-item--particulars">
        <div className="particulars--avatar">
          <div className="avatar">
            <img className="image round" src={avatar} alt="avatar" />
          </div>
        </div>
        <div className="particulars--metadata">
          <p className="metadata--title">
            <strong>{title}</strong>
          </p>
          <p className="metadata--details">
            {channel}
            <i class="bi bi-dot"></i>
            {views}
            <i class="bi bi-dot"></i>
            {postedOn}
          </p>
        </div>
        <div className="particulars--three-dot">
          <i class="bi bi-three-dots-vertical"></i>
        </div>
      </div>
    </div>
  );
};
export default VideoListItem;
