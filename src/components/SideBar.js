import { Link } from "react-router-dom";
import "../assests/css/sidebar.css";
const SideBar = () => {
  return (
    <div className="sidebar-nav">
      <ul className="links-container">
        <Link to="/" className="link">
          <li>
            <i className="bi bi-house-fill icon__large"></i>
            <span className="link-name">Home</span>
          </li>
        </Link>
        <Link to="/liked" className="link">
          <li>
            <i className="bi bi-hand-thumbs-up-fill icon__large"></i>
            <span className="link-name">Liked Videos</span>
          </li>
        </Link>
        <Link to="/playlists" className="link">
          <li>
            <i className="bi bi-music-note-list icon__large"></i>
            <span className="link-name">Playlists</span>
          </li>
        </Link>
        <Link to="/watch-later" className="link">
          <li>
            <i className="bi bi-stopwatch-fill icon__large"></i>
            <span className="link-name">Watch Later</span>
          </li>
        </Link>
        <Link to="/library" className="link">
          <li>
            <i className="bi bi-collection-play-fill icon__large"></i>
            <span className="link-name">Library</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};
export default SideBar;
