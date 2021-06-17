import { Link } from "react-router-dom";
import { useWatchlater } from "../../contexts/WatchlaterProvider";
import { useLike } from "../../contexts/LikeProvider";
import { usePlaylist } from "../../contexts/PlaylistProvider";
import { useHistory } from "../../contexts/HistoryProvider";
import { useModal } from "../../contexts/ModalProvider";
import PlayListItem from "../../components/PlaylistItem/PlayListItem";
import generateThumbnail from "../../utils/generateThumbnail";
import VideoCard from "../../components/VideoCard/VideoCard";
import styles from "./Library.module.css";
import { AiFillLike } from "react-icons/ai";
import { MdWatchLater } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";

const Library = () => {
  const { isWatchlaterLoading, watchlaterState } = useWatchlater();
  const { likeState } = useLike();
  const { playlistState } = usePlaylist();
  const { historyState } = useHistory();
  const { isModalVisible, setModalData, toggleModalVisibility } = useModal();
  const watchLaterPreview = watchlaterState.slice(0, 4);
  const playListPreview = playlistState.slice(0, 4);
  const likePreview = likeState.slice(0, 4);
  const historyPreview = historyState.slice(0, 4);

  const handleOptionClick = (videoId) => {
    setModalData(videoId);
    toggleModalVisibility();
  };

  if (isWatchlaterLoading) {
    return <h1 className="overlay">Loading ...</h1>;
  }
  return (
    <>
      <div className={styles.libraryItemsContainerDesktop}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <MdWatchLater className="icon__large" />
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  paddingLeft: "1rem",
                }}>
                Watch Later
              </div>
            </div>
            <Link
              to="/watchlater"
              className={`link ${styles.hover}`}
              style={{ color: "var(--rb-primary)" }}>
              SEE ALL
            </Link>
          </div>
          <div className={styles.watchlaterVideos}>
            {watchLaterPreview.map(({ video }) => (
              <VideoCard
                key={video._id}
                video={video}
                onOptionClick={handleOptionClick}
              />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <AiFillLike className="icon__large" />
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  paddingLeft: "1rem",
                }}>
                Liked Videos
              </div>
            </div>
            <Link
              to="/liked"
              className={`link ${styles.hover}`}
              style={{ color: "var(--rb-primary)" }}>
              SEE ALL
            </Link>
          </div>
          <div className={styles.likedVideos}>
            {likePreview.map(({ video }) => (
              <VideoCard
                key={video._id}
                video={video}
                onOptionClick={handleOptionClick}
              />
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <RiPlayListFill className="icon__large" />
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  paddingLeft: "1rem",
                }}>
                Playlists
              </div>
            </div>
            <Link
              to="/playlists"
              className={`link ${styles.hover}`}
              style={{ color: "var(--rb-primary)" }}>
              SEE ALL
            </Link>
          </div>
          <div className={styles.playlistedVideosPreview}>
            {playListPreview?.map(({ _id, title, items }) => (
              <Link
                key={_id}
                to={`/playlists/${_id}`}
                className={`link ${styles.hover}`}>
                <img
                  className="image"
                  src={
                    items.length > 0
                      ? generateThumbnail(items[0].video._id)
                      : ""
                  }
                  alt="playlist thumbnail"
                />
                <div style={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {title}
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <FaHistory className="icon__large" />
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  paddingLeft: "1rem",
                }}>
                History Videos
              </div>
            </div>
            <Link
              to="/history"
              className={`link ${styles.hover}`}
              style={{ color: "var(--rb-primary)" }}>
              SEE ALL
            </Link>
          </div>
          <div className={styles.historyVideos}>
            {historyPreview.map(({ video }) => (
              <VideoCard
                key={video._id}
                video={video}
                onOptionClick={handleOptionClick}
              />
            ))}
          </div>
        </section>
      </div>

      <div className={styles.libraryItemsContainer}>
        <div className={styles.libraryTitle}>My Library</div>
        <Link
          to="/watchlater"
          className={`link flex-icon ${styles.libraryItems}`}>
          <MdWatchLater className="icon__large" />
          <div className={styles.libraryItemName}>Watch Later</div>
        </Link>
        <Link to="/liked" className={`link flex-icon ${styles.libraryItems}`}>
          <AiFillLike className="icon__large" />
          <div className={styles.libraryItemName}>Liked Videos</div>
        </Link>
        <Link to="/history" className={`link flex-icon ${styles.libraryItems}`}>
          <FaHistory className="icon__large" />
          <div className={styles.libraryItemName}>History</div>
        </Link>
        <div className={styles.librarySubHeading}>My Playlists</div>{" "}
        {playlistState.map(({ _id, title }) => (
          <PlayListItem key={_id} playlistId={_id} title={title} />
        ))}
      </div>
      {isModalVisible && (
        <Modal handleClose={toggleModalVisibility}>
          <ModalForm formType="SAVE_VIDEO" />
        </Modal>
      )}
    </>
  );
};
export default Library;
