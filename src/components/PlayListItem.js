import "../assests/css/playlistitem.css";
import { Link } from "react-router-dom";
import { usePlaylists } from "../contexts/PlayListsProvider";

const PlayListItem = ({ p_id, name }) => {
  const { playListState, playListDispatch } = usePlaylists();

  const playListSize = playListState.find((playlist) => playlist.p_id === p_id)
    .videos.length;

  return (
    <div className="playlist-item">
      <Link className="link link__large" to={`/playlists/${p_id}`}>
        <div>{name}</div>
        {playListSize > 0 && (
          <div className="item--video-count">
            {playListSize} {playListSize > 1 ? "videos" : "video"}
          </div>
        )}
      </Link>
      <div
        className="btn-delete-playlist"
        onClick={() =>
          playListDispatch({ type: "DELETE_PLAYLIST", payload: { p_id } })
        }
      >
        <strong>DELETE</strong>
      </div>
    </div>
  );
};

export default PlayListItem;
