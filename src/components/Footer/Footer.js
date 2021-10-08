import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaHome } from "react-icons/fa";
import { RiPlayListFill } from "react-icons/ri";
import { MdWatchLater, MdVideoLibrary } from "react-icons/md";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className="link">
        <div className={styles.footerItem}>
          <FaHome className="icon__large" />
          <div style={{ fontSize: "0.9rem" }}>Home</div>
        </div>
      </Link>
      <Link to="/playlists" className="link">
        <div className={styles.footerItem}>
          <RiPlayListFill className="icon__large" />
          <div style={{ fontSize: "0.9rem" }}>Playlists</div>
        </div>
      </Link>
      <Link to="/watchlater" className="link">
        <div className={styles.footerItem}>
          <MdWatchLater className="icon__large" />
          <div style={{ fontSize: "0.9rem" }}>Watch Later</div>
        </div>
      </Link>
      <Link to="/library" className="link">
        <div className={styles.footerItem}>
          <MdVideoLibrary className="icon__large" />
          <div style={{ fontSize: "0.9rem" }}>Library</div>
        </div>
      </Link>
    </footer>
  );
};
export default Footer;
