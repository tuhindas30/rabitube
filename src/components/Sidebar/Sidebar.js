import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import styles from "./Sidebar.module.css";
import { AiFillLike } from "react-icons/ai";
import { FaHistory, FaHome } from "react-icons/fa";
import { MdVideoLibrary, MdWatchLater } from "react-icons/md";
import { RiPlayListFill } from "react-icons/ri";

const Sidebar = () => {
  const { token } = useAuth();
  return (
    <div className={styles.sidebarNav}>
      <ul className={styles.linksContainer}>
        <Link to="/" className={`link ${styles.hover}`}>
          <li className="flex-icon">
            <FaHome className="icon__large" />
            <span className={styles.linkName}>Home</span>
          </li>
        </Link>
        <Link to="/watchlater" className={`link ${styles.hover}`}>
          <li className="flex-icon">
            <MdWatchLater className="icon__large" />
            <span className={styles.linkName}>Watch Later</span>
          </li>
        </Link>
        <Link to="/liked" className={`link ${styles.hover}`}>
          <li className="flex-icon">
            <AiFillLike className="icon__large" />
            <span className={styles.linkName}>Liked Videos</span>
          </li>
        </Link>
        <Link to="/playlists" className={`link ${styles.hover}`}>
          <li className="flex-icon">
            <RiPlayListFill className="icon__large" />
            <span className={styles.linkName}>Playlists</span>
          </li>
        </Link>
        <Link to="/history" className={`link ${styles.hover}`}>
          <li className="flex-icon">
            <FaHistory className="icon__large" />
            <span className={styles.linkName}>History</span>
          </li>
        </Link>
        <Link to="/library" className={`link ${styles.hover}`}>
          <li className="flex-icon">
            <MdVideoLibrary className="icon__large" />
            <span className={styles.linkName}>Library</span>
          </li>
        </Link>
      </ul>
      {!token && (
        <>
          <div style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Sign in to Like and Save videos and many more!
          </div>
          <Link to="/signin" className="btn links btn-link">
            SIGN IN
          </Link>
        </>
      )}
    </div>
  );
};
export default Sidebar;
