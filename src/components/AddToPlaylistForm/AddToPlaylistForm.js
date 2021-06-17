import { useState } from "react";
import { useModal } from "../../contexts/ModalProvider";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import styles from "./AddToPlaylistForm.module.css";
import { IoMdTrash } from "react-icons/io";

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

  const handleCreate = async () => {
    await createNewPlaylist(playlistTitle);
    setPlaylistTitle("");
  };

  const handleCheckBox = async (playlistId, videoId) => {
    const playlist = playlistState.find(
      (playlist) => playlist._id === playlistId
    );
    if (playlist.items.some((item) => item.video._id === videoId)) {
      await removeFromPlaylist(playlistId, videoId);
    } else {
      await addToPlaylist(playlistId, videoId);
    }
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
            />
            <button
              onClick={handleCreate}
              className={`btn primary ${styles.newPlaylistButton}`}>
              Create
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
            className={`btn primary ${styles.newPlaylistButton}`}>
            Create
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
              {title}
            </label>
          </div>
          <button
            onClick={() => deletePlaylist(_id)}
            className={`btn flex-icon ${styles.deletePlaylistButton}`}>
            <IoMdTrash />
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
