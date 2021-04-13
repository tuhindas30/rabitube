import "../assests/css/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer--item">
        <i className="bi bi-house-fill icon__large"></i>
        <p>
          <small>Home</small>
        </p>
      </div>
      <div className="footer--item">
        <i class="bi bi-music-note-list icon__large"></i>
        <p>
          <small>Playlist</small>
        </p>
      </div>
      <div className="footer--item">
        <i class="bi bi-stopwatch-fill icon__large"></i>
        <p>
          <small>Watch Later</small>
        </p>
      </div>
      <div className="footer--item">
        <i class="bi bi-collection-play-fill icon__large"></i>
        <p>
          <small>Library</small>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
