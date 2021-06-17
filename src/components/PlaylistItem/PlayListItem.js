import styles from "./PlaylistItem.module.css";
import { Link } from "react-router-dom";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import { IoMdTrash } from "react-icons/io";

const PlayListItem = ({ playlistId, title }) => {
  const { playlistState, deletePlaylist } = usePlaylist();

  const playListSize = playlistState.find(
    (playlist) => playlist._id === playlistId
  ).items.length;

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
        onClick={async () => await deletePlaylist(playlistId)}
        className={`btn flex-icon ${styles.deletePlaylistButton}`}>
        <IoMdTrash />
      </button>
    </div>
  );
};

export default PlayListItem;
