import { Link } from "react-router-dom";
import "../assests/css/library.css";
import PlayListItem from "../components/PlayListItem";
import generateThumbnail from "../utils/generateThumbnail";
import { usePlaylists } from "../contexts/PlayListsProvider";
import { useWatchLater } from "../contexts/WatchLaterProvider";
import VideoListItem from "../components/VideoListItem";
import { useLike } from "../contexts/LikeProvider";
const Library = () => {
  const { playListState } = usePlaylists();
  const { watchLaterState } = useWatchLater();
  const { likeState } = useLike();
  const watchLaterPreview = watchLaterState.slice(0, 4);
  const playListPreview = playListState.slice(0, 4);
  const likePreview = likeState.slice(0, 4);

  return (
    <>
      <div className="library-items--container__desktop">
        <section className=" section">
          <div className="section-header">
            <div className="section-title">
              <i className="bi bi-stopwatch-fill icon__large"></i>
              <h3>Watch Later</h3>
            </div>
            <Link
              to="/watch-later"
              className="link"
              style={{ color: "var(--rb-primary)" }}
            >
              <strong>SEE ALL</strong>
            </Link>
          </div>
          <div className="watchlater-videos">
            {watchLaterPreview.map(
              ({ v_id, avatar, title, channel, views, postedOn }) => (
                <VideoListItem
                  key={v_id}
                  v_id={v_id}
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
        <section className=" section">
          <div className="section-header">
            <div className="section-title">
              <i className="bi bi-music-note-list icon__large"></i>
              <h3>Playlists</h3>
            </div>
            <Link
              to="/playlists"
              className="link"
              style={{ color: "var(--rb-primary)" }}
            >
              <strong>SEE ALL</strong>
            </Link>
          </div>
          <div className="playlisted-videos-preview">
            {playListPreview.map(({ p_id, name, videos }) => (
              <Link to={`/playlists/${p_id}`} className="link">
                <div className="playlists">
                  <div className="playlist-thumbnail">
                    <img
                      className="image"
                      src={
                        videos.length > 0
                          ? generateThumbnail(videos[0].v_id)
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="playlist-name">{name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section className=" section">
          <div className="section-header">
            <div className="section-title">
              <i className="bi bi-stopwatch-fill icon__large"></i>
              <h3>Liked Videos</h3>
            </div>
            <Link
              to="/liked"
              className="link"
              style={{ color: "var(--rb-primary)" }}
            >
              <strong>SEE ALL</strong>
            </Link>
          </div>
          <div className="watchlater-videos">
            {likePreview.map(
              ({ v_id, avatar, title, channel, views, postedOn }) => (
                <VideoListItem
                  key={v_id}
                  v_id={v_id}
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

      <div className="library-items--container">
        <div className="library-title">
          <strong>My Library</strong>
        </div>
        <Link to="/liked" className="link">
          <div className="library-items">
            <i className="bi bi-hand-thumbs-up-fill"></i>
            <div className="library-item-name">Liked Videos</div>
          </div>
        </Link>
        <Link to="/watch-later" className="link">
          <div className="library-items">
            <i className="bi bi-stopwatch-fill"></i>
            <div className="library-item-name">Watch Later</div>
          </div>
        </Link>
        <div className="library-items">
          <div className="library-item-name__no-image">Playlists</div>{" "}
        </div>
        <div className="playlists-items">
          {playListState.map(({ p_id, name }) => (
            <PlayListItem key={p_id} p_id={p_id} name={name} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Library;
