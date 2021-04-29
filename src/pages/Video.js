import { useParams } from "react-router";
import "../assests/css/video.css";
import generateVideoLink from "../utils/generateVideoLink";
import videosDB from "../videosDB";
import { useLike } from "../contexts/LikeProvider";
import SaveVideoModal from "../components/SaveVideoModal";
import { useModal } from "../contexts/ModalProvider";

const Video = () => {
  const { v_id } = useParams();
  const {
    category,
    avatar,
    title,
    views,
    channel,
    postedOn,
    subscriber,
    duration,
    description,
  } = videosDB.find((item) => item.v_id === v_id);
  const { likeState, likeDispatch } = useLike();
  const { isModalVisible, setModalVisibility } = useModal();

  const isVideoPresent = likeState.some((item) => item.v_id === v_id);

  return (
    <div className="video">
      {isModalVisible === "show" && (
        <SaveVideoModal
          v_id={v_id}
          avatar={avatar}
          title={title}
          views={views}
          channel={channel}
          postedOn={postedOn}
        />
      )}
      <div className="video--container">
        <iframe
          src={generateVideoLink(v_id)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video--details">
        <small>#{category}</small>
        <p className="title__large">{title}</p>
        <small>{views} views</small>
        <div className="savebar">
          <div
            onClick={() =>
              likeDispatch({
                type: "LIKE_TOGGLE",
                payload: { v_id, title, avatar, channel, views, postedOn },
              })
            }
            className="savebar--item"
          >
            <i
              className="bi bi-hand-thumbs-up-fill icon__large"
              style={{
                color: isVideoPresent ? "var(--rb-primary)" : "black",
              }}
            ></i>
            <p>
              <small>Like</small>
            </p>
          </div>
          <div
            onClick={() => setModalVisibility("show")}
            className="savebar--item"
          >
            <i className="bi bi-save2 icon__large"></i>
            <p>
              <small>Save</small>
            </p>
          </div>
        </div>
        <div className="channel-description">
          <div className="avatar">
            <img className="image round" src={avatar} alt="avatar" />
          </div>
          <div className="title">
            <p>{channel}</p>
            <small>{subscriber} subcribers</small>
          </div>
        </div>
        <div className="description">
          <p>Published on {postedOn}</p>
          {description}
        </div>
      </div>
    </div>
  );
};
export default Video;
