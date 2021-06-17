import styles from "./Playlists.module.css";
import PlayListItem from "../../components/PlaylistItem/PlayListItem";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import { ReactComponent as EmptyPlaylistSvg } from "./EmptyPlaylistImage.svg";
import { Link } from "react-router-dom";
import { RiPlayListAddFill } from "react-icons/ri";
import { useModal } from "../../contexts/ModalProvider";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";

const PlayLists = () => {
  const { isPlaylistLoading, playlistState } = usePlaylist();
  const { isModalVisible, toggleModalVisibility } = useModal();

  if (isPlaylistLoading === 0) {
    return <h1 className="overlay">Loading ...</h1>;
  }

  if (playlistState.length === 0) {
    return (
      <div className={styles.noPlaylistFound}>
        <EmptyPlaylistSvg width="80%" />
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
      <div className={styles.playlistsHeader}>
        <div>PlayLists</div>
        <button
          onClick={toggleModalVisibility}
          className={`btn primary flex-icon ${styles.newPlaylistButton}`}>
          <RiPlayListAddFill style={{ marginRight: "0.5rem" }} /> Create
        </button>
      </div>
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
