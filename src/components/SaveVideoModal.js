import { useState } from "react";
import "../assests/css/modal.css";
import { useModal } from "../contexts/ModalProvider";
import { usePlaylists } from "../contexts/PlayListsProvider";
import { useWatchLater } from "../contexts/WatchLaterProvider";

const SaveVideoModal = ({ v_id, avatar, title, views, channel, postedOn }) => {
  const { watchLaterDispatch } = useWatchLater();
  const { playListState, playListDispatch } = usePlaylists();
  const { isModalVisible, setModalVisibility } = useModal();
  const [inputPlayListName, setInputPlayListName] = useState("");

  return (
    <>
      <div
        className={isModalVisible === "show" ? "modal-overlay show" : "hide"}
      ></div>
      <div className={isModalVisible === "show" ? "modal show" : "hide"}>
        <div
          onClick={() => {
            watchLaterDispatch({
              type: "ADD_TO_WATCH_LATER",
              payload: {
                info: { v_id, avatar, title, views, channel, postedOn },
              },
            });
          }}
          className="modal--items"
        >
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
              onClick={() =>
                playListDispatch({
                  type: "ADD_NEW_PLAYLIST",
                  payload: { inputPlayListName, setInputPlayListName },
                })
              }
              className="btn primary btn__small"
              disabled={inputPlayListName === "" ? true : false}
            >
              Create
            </button>
          </form>
        </div>
        <div className="playlist-names">
          {playListState.map(({ p_id, name, videos }) => (
            <div key={p_id}>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    playListDispatch({
                      type: "ADD_TO_PLAYLIST",
                      payload: {
                        p_id,
                        v_id,
                        avatar,
                        title,
                        views,
                        channel,
                        postedOn,
                      },
                    })
                  }
                  checked={videos.some((item) => item.v_id === v_id)}
                />
                <span>{name}</span>
              </label>
            </div>
          ))}
        </div>

        <div
          onClick={() => setModalVisibility("hide")}
          className="modal--items"
        >
          Close
        </div>
      </div>
    </>
  );
};
export default SaveVideoModal;
