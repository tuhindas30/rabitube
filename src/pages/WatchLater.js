import { useState } from "react";
import "../assests/css/watchlater.css";
import DeleteModal from "../components/DeleteModal";
import VideoList from "../components/VideoList";
import { useModal } from "../contexts/ModalProvider";
import { useWatchLater } from "../contexts/WatchLaterProvider";
import generateThumbnail from "../utils/generateThumbnail";

const WatchLater = () => {
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const { watchLaterState, watchLaterDispatch } = useWatchLater();
  const [modalData, setModalData] = useState({
    v_id: "",
  });

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setDeleteModalVisibility("show");
  };
  const watchLaterThumbnail = watchLaterState.map((video) => video.v_id)[0];
  return (
    <div className="watchlater-videolist">
      <div className="playlist-details">
        <div className="watchlater--title">
          <strong>Watch Later</strong>
        </div>
        {watchLaterState.length > 0 ? (
          <div className="watchlater-videos-count">
            {watchLaterState.length} videos
          </div>
        ) : (
          <div>There are no videos in this playlist yet.</div>
        )}
      </div>
      {isDeleteModalVisible === "show" && (
        <DeleteModal dispatcher={watchLaterDispatch} {...modalData} />
      )}
      <div className="playlist-bar">
        <div className="watchlater--title">
          <div className="playlist-image">
            <img
              className="image"
              src={generateThumbnail(watchLaterThumbnail)}
              alt=""
            />
          </div>
          <strong>Watch Later</strong>
        </div>
        {watchLaterState.length > 0 ? (
          <div className="watchlater-videos-count info__grey">
            <small>
              {watchLaterState.length}{" "}
              {watchLaterState.length > 1 ? "videos" : "video"}
            </small>
          </div>
        ) : (
          <div>There are no videos in this playlist yet.</div>
        )}
      </div>
      {watchLaterState.map(({ v_id, title, channel }) => (
        <VideoList
          key={v_id}
          v_id={v_id}
          title={title}
          channel={channel}
          onOptionClick={handleOptionClick}
        />
      ))}
    </div>
  );
};
export default WatchLater;
