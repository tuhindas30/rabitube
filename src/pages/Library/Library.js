import { Link } from "react-router-dom";
import styles from "./Library.module.css";
import PlayListItem from "../../components/PlaylistItem/PlayListItem";
import generateThumbnail from "../../utils/generateThumbnail";
import VideoCard from "../../components/VideoCard/VideoCard";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import { useAuth } from "../../contexts/AuthProvider";

const Library = () => {
  const { userState } = useAuth();
  const watchLaterPreview = userState.watchlater?.slice(0, 4);
  const playListPreview = userState.playlists?.slice(0, 4);
  const likePreview = userState.liked?.slice(0, 4);

  return (
    <>
      <DefaultWithoutSearch>
        <div className={styles.libraryItemsContainerDesktop}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <i className="bi bi-stopwatch-fill icon__large"></i>
                <h3>Watch Later</h3>
              </div>
              <Link
                to="/watch-later"
                className="link"
                style={{ color: "var(--rb-primary)" }}>
                <strong>SEE ALL</strong>
              </Link>
            </div>
            <div className={styles.watchlaterVideos}>
              {watchLaterPreview?.map(
                ({ _id, avatar, title, channel, views, postedOn }) => (
                  <VideoCard
                    key={_id}
                    vId={_id}
                    avatar={avatar}
                    title={title}
                    views={views}
                    channel={channel}
                    postedOn={postedOn}
                    // onOptionClick={handleOptionClick}
                  />
                )
              )}
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <i className="bi bi-music-note-list icon__large"></i>
                <h3>Playlists</h3>
              </div>
              <Link
                to="/playlists"
                className="link"
                style={{ color: "var(--rb-primary)" }}>
                <strong>SEE ALL</strong>
              </Link>
            </div>
            <div className={styles.playlistedVideosPreview}>
              {playListPreview?.map(({ _id, title, videos }) => (
                <Link to={`/playlists/${_id}`} className="link">
                  <div className={styles.playlists}>
                    <div>
                      <img
                        className="image"
                        src={
                          videos.length > 0
                            ? generateThumbnail(videos[0]._id)
                            : ""
                        }
                        alt=""
                      />
                    </div>
                    <div>{title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <i className="bi bi-stopwatch-fill icon__large"></i>
                <h3>Liked Videos</h3>
              </div>
              <Link
                to="/liked"
                className="link"
                style={{ color: "var(--rb-primary)" }}>
                <strong>SEE ALL</strong>
              </Link>
            </div>
            <div className={styles.watchlaterVideos}>
              {likePreview?.map(
                ({ _id, avatar, title, channel, views, postedOn }) => (
                  <VideoCard
                    key={_id}
                    vId={_id}
                    avatar={avatar}
                    title={title}
                    views={views}
                    channel={channel}
                    postedOn={postedOn}
                    // onOptionClick={handleOptionClick}
                  />
                )
              )}
            </div>
          </section>
        </div>

        <div className={styles.libraryItemsContainer}>
          <div className={styles.libraryTitle}>
            <strong>My Library</strong>
          </div>
          <Link to="/liked" className="link">
            <div className={styles.libraryItems}>
              <i className="bi bi-hand-thumbs-up-fill"></i>
              <div className={styles.libraryItemName}>Liked Videos</div>
            </div>
          </Link>
          <Link to="/watch-later" className="link">
            <div className={styles.libraryItems}>
              <i className="bi bi-stopwatch-fill"></i>
              <div className={styles.libraryItemName}>Watch Later</div>
            </div>
          </Link>
          <div className={styles.libraryItems}>
            <div className={styles.libraryItemNameNoImage}>Playlists</div>{" "}
          </div>
          <div className={styles.playlistsItem}>
            {userState.playlists?.map(({ _id, title }) => (
              <PlayListItem key={_id} pId={_id} title={title} />
            ))}
          </div>
        </div>
      </DefaultWithoutSearch>
    </>
  );
};
export default Library;
