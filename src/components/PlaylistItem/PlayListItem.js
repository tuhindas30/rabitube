import styles from "./PlaylistItem.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../../api/helper";

const PlayListItem = ({ pId, title }) => {
  const { userState, userDispatch } = useAuth();

  const playListSize = userState.playlists.find(
    (playlist) => playlist._id === pId
  ).videos.length;

  const handleDeletePlaylistBtn = async () => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/users/${userState._id}/playlists/${pId}`
      );
      console.log(data);
      if (data.status === "SUCCESS") {
        userDispatch({ type: "DELETE_PLAYLIST", payload: { pId } });
      }
    } catch (err) {
      console.log(err);
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
        onClick={handleDeletePlaylistBtn}>
        <strong>DELETE</strong>
      </div>
    </div>
  );
};

export default PlayListItem;
