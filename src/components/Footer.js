import { Link } from "react-router-dom";
import "../assests/css/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/" className="link">
        <div className="footer--item">
          <i className="bi bi-house-fill icon__large"></i>
          <p>
            <small>Home</small>
          </p>
        </div>
      </Link>
      <Link to="/playlists" className="link">
        <div className="footer--item">
          <i className="bi bi-music-note-list icon__large"></i>
          <p>
            <small>Playlist</small>
          </p>
        </div>
      </Link>
      <Link to="/watch-later" className="link">
        <div className="footer--item">
          <i className="bi bi-stopwatch-fill icon__large"></i>
          <p>
            <small>Watch Later</small>
          </p>
        </div>
      </Link>
      <Link to="/library" className="link">
        <div className="footer--item">
          <i className="bi bi-collection-play-fill icon__large"></i>
          <p>
            <small>Library</small>
          </p>
        </div>
      </Link>
    </footer>
  );
};
export default Footer;
