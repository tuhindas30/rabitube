import { useState } from "react";
import "./SaveVideoModal.css";
import showToast from "../../utils/showToast";
import { useAuth } from "../../contexts/AuthProvider";
import { useModal } from "../../contexts/ModalProvider";
import { useWatchlater } from "../../hooks/useWatchlater";
import { usePlaylist } from "../../hooks/usePlaylist";

const SaveVideoModal = ({ vId, title, duration, channel }) => {
  const [inputPlayListName, setInputPlayListName] = useState("");
  const { isModalVisible, setModalVisibility } = useModal();
  const { userState, userDispatch } = useAuth();
  const { addToWatchlater } = useWatchlater(userDispatch);
  const { createNewPlaylist, addToPlaylist, removeFromPlaylist } =
    usePlaylist(userDispatch);

  const handleAddToWatchLater = async () => {
    setModalVisibility("hide");
    if (!userState.watchlater?.some((video) => video._id === vId)) {
      showToast("Adding video to watch later ...");
      try {
        await addToWatchlater(vId, title, duration, channel);
        showToast("Video added to watch later");
      } catch (err) {
        console.log(err);
        showToast("Something went wrong. Please try again");
      }
    } else {
      showToast("Video already exists in watch later");
    }
  };

  const handleCreateNewPlaylist = async (e, playlistTitle) => {
    e.preventDefault();
    showToast(`Creating playlist ${playlistTitle}`);
    setInputPlayListName("");
    try {
      await createNewPlaylist(playlistTitle);
      showToast(`Created playlist ${playlistTitle}`);
    } catch (err) {
      console.log(err);
      showToast("Something went wrong.Please try again");
    }
  };

  const handleCheckbox = async (pId, title) => {
    const playlist = userState.playlists.find(
      (playlist) => playlist._id === pId
    );
    try {
      if (playlist.videos.some((video) => video._id === vId)) {
        showToast(`Removing video from playlist ${title} ...`);
        await removeFromPlaylist(pId, vId);
        showToast(`Video removed from playlist ${title}`);
      } else {
        showToast(`Adding video to playlist ${title} ...`);
        await addToPlaylist(pId, vId, title, duration, channel);
        showToast(`Video added to playlist ${title}`);
      }
    } catch (err) {
      console.log(err);
      showToast("Something went wrong. Please try again");
    }
  };

  return (
    <>
      <div
        className={
          isModalVisible === "show" ? "modal-overlay show" : "hide"
        }></div>
      <div className={isModalVisible === "show" ? "modal show" : "hide"}>
        <div onClick={handleAddToWatchLater} className="modal--items">
          Save to Watch later
        </div>
        <div className="modal--items pb-0">
          <strong>Save to playlist</strong>
        </div>
        <div className="modal--items">
          <form onSubmit={(e) => handleCreateNewPlaylist(e, inputPlayListName)}>
            <input
              value={inputPlayListName}
              onChange={(e) => setInputPlayListName(e.target.value)}
              className="search-box"
              type="text"
              placeholder="Playlist name"
            />
            <button
              className="btn primary btn__small"
              disabled={inputPlayListName === "" ? true : false}>
              Create
            </button>
          </form>
        </div>
        <div className="playlist-names">
          {userState.playlists.map(({ _id, title, videos }) => (
            <div key={_id}>
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheckbox(_id, title)}
                  defaultChecked={videos.some((item) => item._id === vId)}
                />
                <span>{title}</span>
              </label>
            </div>
          ))}
        </div>

        <div
          onClick={() => setModalVisibility("hide")}
          className="modal--items">
          Close
        </div>
      </div>
    </>
  );
};
export default SaveVideoModal;
