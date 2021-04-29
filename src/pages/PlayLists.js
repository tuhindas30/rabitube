import "../assests/css/playlists.css";
import PlayListItem from "../components/PlayListItem";
import { usePlaylists } from "../contexts/PlayListsProvider";

const PlayLists = () => {
  const { playListState } = usePlaylists();

  return (
    <div className="playlists--container">
      <div className="playlists--title">
        <strong>PlayLists</strong>
      </div>
      {playListState.length > 0 ? (
        playListState.map(({ p_id, name }) => (
          <PlayListItem key={p_id} p_id={p_id} name={name} />
        ))
      ) : (
        <div className="playlists-empty">No playlist created yet.</div>
      )}
    </div>
  );
};
export default PlayLists;
