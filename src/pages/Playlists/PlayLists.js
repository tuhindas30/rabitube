import { usePlaylist } from "../../contexts/PlaylistProvider";
import { Link } from "react-router-dom";
import { useModal } from "../../contexts/ModalProvider";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";
import PlayListItem from "../../components/PlaylistItem/PlayListItem";
import { ReactComponent as EmptyPlaylistSvg } from "./EmptyPlaylistImage.svg";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";
import styles from "./Playlists.module.css";

const PlayLists = () => {
  const { isPlaylistLoading, playlistState } = usePlaylist();
  const { isModalVisible, toggleModalVisibility } = useModal();

  if (isPlaylistLoading === 0) {
    return (
      <div className="overlay">
        <Loader />
      </div>
    );
  }

  if (playlistState.length === 0) {
    return (
      <div className={styles.noPlaylistFound}>
        <EmptyPlaylistSvg width="50%" />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "1rem 2rem",
          }}>
          No playlist found!
        </p>
        <Link to="/" className="btn links btn-link">
          Add videos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.playlistsContainer}>
      <div className={styles.playlistsHeader}>PlayLists</div>
      {playlistState.map(({ _id, title }) => (
        <PlayListItem key={_id} playlistId={_id} title={title} />
      ))}
      {isModalVisible && (
        <Modal handleClose={toggleModalVisibility}>
          <ModalForm formType="ADD_TO_PLAYLIST" />
        </Modal>
      )}
    </div>
  );
};
export default PlayLists;
