import styles from "./PlaylistItem.module.css";
import { Link } from "react-router-dom";
import showToast from "../../utils/showToast";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlaylist } from "../../hooks/usePlaylist";

const PlayListItem = ({ pId, title }) => {
  const { userState, userDispatch } = useAuth();
  const { deletePlaylist } = usePlaylist(userDispatch);

  const playListSize = userState.playlists.find(
    (playlist) => playlist._id === pId
  ).videos.length;

  const handleDeletePlaylist = async (playlistId) => {
    showToast(`Deleting playlist ${title} ...`);
    try {
      await deletePlaylist(playlistId);
      showToast(`Deleted playlist ${title}`);
    } catch (err) {
      console.log(err);
      showToast("Something went wrong. Please try again");
    }
  };

  return (
    <div className={styles.playlistItem}>
      <Link className={`${styles.linkLarge} link`} to={`/playlists/${pId}`}>
        <div>{title}</div>
        {playListSize > 0 && (
          <div className={styles.itemVideoCount}>
            {playListSize} {playListSize > 1 ? "videos" : "video"}
          </div>
        )}
      </Link>
      <div
        className={styles.btnDeletePlaylist}
        onClick={() => handleDeletePlaylist(pId)}>
        <strong>DELETE</strong>
      </div>
    </div>
  );
};

export default PlayListItem;
