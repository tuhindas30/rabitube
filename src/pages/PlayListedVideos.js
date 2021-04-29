import { useState } from "react";
import { useParams } from "react-router";
import DeleteModal from "../components/DeleteModal";
import VideoList from "../components/VideoList";
import { useModal } from "../contexts/ModalProvider";
import { usePlaylists } from "../contexts/PlayListsProvider";
import generateThumbnail from "../utils/generateThumbnail";
import "../assests/css/playlistedvideos.css";

const PlayListedVideos = () => {
  const { playListState, playListDispatch } = usePlaylists();
  const { isDeleteModalVisible, setDeleteModalVisibility } = useModal();
  const { p_id } = useParams();
  const [modalData, setModalData] = useState({
    v_id: "",
  });
  const playlist = playListState.find((item) => item.p_id === p_id);

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setDeleteModalVisibility("show");
  };

  const playLisThumbnail = playlist.videos.map((video) => video.v_id)[0];

  console.log({ playLisThumbnail });

  return (
    <>
      {isDeleteModalVisible === "show" && (
        <DeleteModal dispatcher={playListDispatch} {...modalData} p_id={p_id} />
      )}
      <div className="playlisted-videos">
        <div className="playlist-details">
          <div className="playlist-title">
            <strong>{playlist.name}</strong>
          </div>
          {playlist.videos.length > 0 ? (
            <div className="playlist-video-count info__grey">
              <small>
                {playlist.videos.length}{" "}
                {playlist.videos.length > 1 ? "videos" : "video"}
              </small>
            </div>
          ) : (
            <div>There are no videos in this playlist yet.</div>
          )}
        </div>
        <div className="playlist-bar">
          <div className="playlist-title">
            <div className="playlist-image">
              <img
                className="image"
                src={generateThumbnail(playLisThumbnail)}
                alt=""
              />
            </div>
            <strong>{playlist.name}</strong>
            {playlist.videos.length > 0 ? (
              <div className="playlist-video-count info__grey">
                {playlist.videos.length}{" "}
                {playlist.videos.length > 1 ? "videos" : "video"}
              </div>
            ) : (
              <div>There are no videos in this playlist yet.</div>
            )}
          </div>
        </div>

        {playlist.videos.map(({ v_id, title, channel }) => (
          <VideoList
            key={v_id}
            v_id={v_id}
            title={title}
            channel={channel}
            onOptionClick={handleOptionClick}
          />
        ))}
      </div>
    </>
  );
};
export default PlayListedVideos;
