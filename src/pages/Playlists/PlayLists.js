import styles from "./Playlists.module.css";
import PlayListItem from "../../components/PlaylistItem/PlayListItem";
import { useAuth } from "../../contexts/AuthProvider";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";

const PlayLists = () => {
  const { userState } = useAuth();

  return (
    <>
      <DefaultWithoutSearch>
        <div className={styles.playlistsContainer}>
          <div className={styles.playlistsTitle}>
            <strong>PlayLists</strong>
          </div>
          {userState.playlists?.length > 0 ? (
            userState.playlists.map(({ _id, title }) => (
              <PlayListItem key={_id} pId={_id} title={title} />
            ))
          ) : (
            <div className={styles.playlistsEmpty}>
              No playlist created yet.
            </div>
          )}
        </div>
      </DefaultWithoutSearch>
    </>
  );
};
export default PlayLists;
