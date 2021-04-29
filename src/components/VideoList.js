import generateThumbnail from "../utils/generateThumbnail";
import truncate from "../utils/truncate";
import "../assests/css/videolist.css";
import { Link } from "react-router-dom";

const VideoList = ({ v_id, title, channel, onOptionClick }) => {
  const handleShowModal = () => {
    if (typeof onOptionClick === "function")
      onOptionClick({
        v_id,
      });
  };

  return (
    <div key={v_id} className="videos--container">
      <Link to={`/video/${v_id}`} className="link">
        <div className="video-thumbnail">
          <img className="image" src={generateThumbnail(v_id)} alt="" />
        </div>
      </Link>
      <div className="video-info container-grid ">
        <Link to={`/video/${v_id}`} className="link">
          <div>
            <p className="info--title ">
              <strong className="">{truncate(title, 40)}</strong>
            </p>
            <small className="info__grey">{channel}</small>
          </div>
        </Link>
        <div onClick={handleShowModal} className=" container-grid fit-content">
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
    </div>
  );
};
export default VideoList;
