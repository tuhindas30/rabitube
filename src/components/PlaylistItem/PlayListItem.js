import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import { IoMdTrash } from "react-icons/io";
import styles from "./PlaylistItem.module.css";

const PlayListItem = ({ playlistId, title }) => {
  const { playlistState, deletePlaylist } = usePlaylist();
  const [isLoading, setLoading] = useState(false);

  const playListSize = playlistState.find(
    (playlist) => playlist._id === playlistId
  ).items.length;

  const del = async (playlistId) => {
    setLoading(true);
    await deletePlaylist(playlistId);
    setLoading(false);
  };

  return (
    <div className={styles.playlistItem}>
      <Link
        className={`${styles.linkLarge} link`}
        to={`/playlists/${playlistId}`}>
        {title}
        {playListSize > 0 && (
          <div className={styles.itemVideoCount}>
            {playListSize} {playListSize > 1 ? "videos" : "video"}
          </div>
        )}
      </Link>
      <button
        onClick={() => del(playlistId)}
        className={`btn flex-icon ${styles.deletePlaylistButton}`}>
        {isLoading ? (
          <Loader style={{ width: "1.2rem", height: "1.2rem" }} />
        ) : (
          <IoMdTrash />
        )}
      </button>
    </div>
  );
};

export default PlayListItem;
