import { useState } from "react";
import "../assests/css/liked.css";
import DeleteModal from "../components/DeleteModal";
import VideoList from "../components/VideoList";
import { useLike } from "../contexts/LikeProvider";
import { useModal } from "../contexts/ModalProvider";
import generateThumbnail from "../utils/generateThumbnail";

const Liked = () => {
  const { likeState, likeDispatch } = useLike();
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const [modalData, setModalData] = useState({
    v_id: "",
  });

  const likeThumbnail = likeState.map((video) => video.v_id)[0];

  console.log({ likeThumbnail });

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setDeleteModalVisibility("show");
  };
  return (
    <div className="liked-items">
      <div className="playlist-details">
        <div className="liked-title">
          <strong>Liked Videos</strong>
        </div>
        {likeState.length > 0 ? (
          <div className="info__grey">
            <small>
              {likeState.length} {likeState.length > 1 ? "videos" : "video"}
            </small>
          </div>
        ) : (
          <div>There are no videos in this playlist yet.</div>
        )}
      </div>
      <div className="playlist-bar">
        <div className="liked--title">
          <div className="playlist-image">
            <img
              className="image"
              src={generateThumbnail(likeThumbnail)}
              alt=""
            />
          </div>
          <strong>Liked Videos</strong>
          {likeState.length > 0 ? (
            <div className="info__grey">
              <small>
                {likeState.length} {likeState.length > 1 ? "videos" : "video"}
              </small>
            </div>
          ) : (
            <div>There are no videos in this playlist yet.</div>
          )}
        </div>
      </div>
      <div className="liked--videos">
        {isDeleteModalVisible === "show" && (
          <DeleteModal dispatcher={likeDispatch} {...modalData} />
        )}

        {likeState.map(({ v_id, title, channel }) => (
          <VideoList
            key={v_id}
            v_id={v_id}
            title={title}
            channel={channel}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Liked;
