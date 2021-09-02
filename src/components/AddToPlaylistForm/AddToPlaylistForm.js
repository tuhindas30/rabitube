import { useState } from "react";
import { useModal } from "../../contexts/ModalProvider";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { IoMdTrash } from "react-icons/io";
import styles from "./AddToPlaylistForm.module.css";

const AddToPlaylistForm = () => {
  const {
    playlistState,
    createNewPlaylist,
    addToPlaylist,
    removeFromPlaylist,
    deletePlaylist,
  } = usePlaylist();
  const { modalData } = useModal();
  const [createPlaylistDiv, setCreatePlaylistDiv] = useState(false);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [loader, setLoader] = useState({
    create: false,
    add: false,
    delete: false,
  });

  const handleCreate = async () => {
    if (playlistTitle.length > 0) {
      setLoader((state) => ({ ...state, create: true }));
      await createNewPlaylist(playlistTitle, modalData);
      setLoader((state) => ({ ...state, create: false }));
      setPlaylistTitle("");
    }
  };

  const del = async (playlistId) => {
    setLoader((state) => ({ ...state, delete: true }));
    await deletePlaylist(playlistId);
    setLoader((state) => ({ ...state, delete: false }));
  };

  const handleCheckBox = async (playlistId, videoId) => {
    const playlist = playlistState.find(
      (playlist) => playlist._id === playlistId
    );
    setLoader((state) => ({ ...state, add: true }));
    if (playlist.items.some((item) => item.video._id === videoId)) {
      await removeFromPlaylist(playlistId, videoId);
    } else {
      await addToPlaylist(playlistId, videoId);
    }
    setLoader((state) => ({ ...state, add: false }));
  };

  if (playlistState.length === 0) {
    return (
      <>
        <div style={{ padding: "1rem", fontSize: "1.1rem" }}>
          No playlist found
        </div>
        {createPlaylistDiv && (
          <>
            <input
              className={styles.titleInput}
              type="text"
              value={playlistTitle}
              onChange={(e) => setPlaylistTitle(e.target.value)}
              disabled={loader.create}
            />
            <button
              onClick={handleCreate}
              className={`btn primary ${styles.newPlaylistButton}`}>
              {loader.create ? (
                <Loader style={{ width: "1.5rem", height: "1.5rem" }} />
              ) : (
                "Create"
              )}
            </button>
          </>
        )}
        <button
          onClick={() => setCreatePlaylistDiv(true)}
          className={`btn primary ${styles.newPlaylistButton}`}>
          Create New Playlist
        </button>
      </>
    );
  }

  return (
    <>
      <div style={{ padding: "1rem", fontSize: "1.1rem" }}>Save to ...</div>
      {createPlaylistDiv && (
        <>
          <input
            className={styles.titleInput}
            type="text"
            value={playlistTitle}
            onChange={(e) => setPlaylistTitle(e.target.value)}
          />
          <button
            onClick={handleCreate}
            className={`btn primary ${styles.newPlaylistButton}`}
            disabled={loader.create}>
            {loader.create ? (
              <Loader style={{ width: "1.5rem", height: "1.5rem" }} />
            ) : (
              "Create"
            )}
          </button>
        </>
      )}
      {playlistState.map(({ _id, title, items }) => (
        <div
          key={_id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <div style={{ fontSize: "1.1rem", textAlign: "left" }}>
            <label>
              <input
                className={styles.checkBoxInput}
                type="checkbox"
                onChange={() => handleCheckBox(_id, modalData)}
                defaultChecked={items.some(
                  (item) => item.video._id === modalData
                )}
              />
              {title}{" "}
              {loader.add ? (
                <Loader style={{ width: "1.5rem", height: "1.5rem" }} />
              ) : (
                ""
              )}
            </label>
          </div>
          <button
            onClick={() => del(_id)}
            className={`btn flex-icon ${styles.deletePlaylistButton}`}
            disabled={loader.delete}>
            {loader.delete ? (
              <Loader style={{ width: "1rem", height: "1rem" }} />
            ) : (
              <IoMdTrash />
            )}
          </button>
        </div>
      ))}
      <button
        onClick={() => setCreatePlaylistDiv(true)}
        className={`btn primary ${styles.newPlaylistButton}`}>
        Create New Playlist
      </button>
    </>
  );
};

export default AddToPlaylistForm;
