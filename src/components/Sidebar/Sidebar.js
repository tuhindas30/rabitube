import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={styles.sidebarNav}>
      <ul className={styles.linksContainer}>
        <Link to="/" className="link">
          <li>
            <i className="bi bi-house-fill icon__large"></i>
            <span className={styles.linkName}>Home</span>
          </li>
        </Link>
        <Link to="/liked" className="link">
          <li>
            <i className="bi bi-hand-thumbs-up-fill icon__large"></i>
            <span className={styles.linkName}>Liked Videos</span>
          </li>
        </Link>
        <Link to="/playlists" className="link">
          <li>
            <i className="bi bi-music-note-list icon__large"></i>
            <span className={styles.linkName}>Playlists</span>
          </li>
        </Link>
        <Link to="/watch-later" className="link">
          <li>
            <i className="bi bi-stopwatch-fill icon__large"></i>
            <span className={styles.linkName}>Watch Later</span>
          </li>
        </Link>
        <Link to="/library" className="link">
          <li>
            <i className="bi bi-collection-play-fill icon__large"></i>
            <span className={styles.linkName}>Library</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};
export default Sidebar;
