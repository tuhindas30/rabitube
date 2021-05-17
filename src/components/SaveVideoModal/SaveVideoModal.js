import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../api/helper";
import "./SaveVideoModal.css";
import { useAuth } from "../../contexts/AuthProvider";
import { useModal } from "../../contexts/ModalProvider";
import showToast from "../../utils/showToast";

const SaveVideoModal = ({ vId, title, duration, channel }) => {
  const { isModalVisible, setModalVisibility } = useModal();
  const [inputPlayListName, setInputPlayListName] = useState("");
  const { userState, userDispatch } = useAuth();
  const url = `${BASE_URL}/users/${userState._id}/watchlater`;

  const handleAddToWatchLater = async () => {
    setModalVisibility("hide");
    if (!userState.watchlater?.some((video) => video._id === vId)) {
      showToast("Wait a sec ... Adding");
      try {
        const { data } = await axios.post(url, {
          id: vId,
        });
        if (data.status === "SUCCESS") {
          userDispatch({
            type: "ADD_TO_WATCH_LATER",
            payload: {
              _id: vId,
              title,
              duration,
              channel,
            },
          });
          showToast("Added to Watch later");
        }
      } catch (err) {
        console.log(err);
        showToast(err.response.data.message);
      }
    } else {
      showToast("Video already in Watch later");
    }
  };

  const handleCreatePlaylist = async (playlistTitle) => {
    showToast(`Creating ${playlistTitle}`);
    setInputPlayListName("");
    try {
      const { data } = await axios.post(
        `${BASE_URL}/users/${userState._id}/playlists`,
        {
          title: playlistTitle,
        }
      );
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "CREATE_PLAYLIST",
          payload: { playlists: data.playlists },
        });
        showToast(`Created ${playlistTitle}`);
      }
    } catch (err) {
      console.log(err);
      showToast(err.response.data.message);
    }
  };

  const handleAddToPlaylist = async (pId, title) => {
    const playlist = userState.playlists.find(
      (playlist) => playlist._id === pId
    );
    try {
      if (playlist.videos.some((video) => video._id === vId)) {
        showToast(`Removing from ${title} ...`);
        const { data } = await axios.delete(
          `${BASE_URL}/users/${userState._id}/playlists/${pId}/${vId}`
        );
        if (data.status === "SUCCESS") {
          userDispatch({ type: "DELETE_FROM_PLAYLIST", payload: { pId, vId } });
          showToast(`Removed from ${title}`);
        }
      } else {
        showToast(`Wait a sec ... Adding to ${title}`);
        const { data } = await axios.post(
          `${BASE_URL}/users/${userState._id}/playlists/${pId}`,
          {
            id: vId,
          }
        );
        if (data.status === "SUCCESS") {
          userDispatch({
            type: "ADD_TO_PLAYLIST",
            payload: { _id: vId, pId, title, duration, channel },
          });
          showToast(`Added to ${title}`);
        }
      }
    } catch (err) {
      console.log(err);
      showToast(err.response.data.message);
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
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={inputPlayListName}
              onChange={(e) => setInputPlayListName(e.target.value)}
              className="search-box"
              type="text"
              placeholder="Playlist name"
            />
            <button
              onClick={() => handleCreatePlaylist(inputPlayListName)}
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
                  onChange={() => handleAddToPlaylist(_id, title)}
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
