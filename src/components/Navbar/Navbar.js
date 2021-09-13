import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import debounce from "../../utils/debounce";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = ({ search = false, searchInput = "", setSearchInput }) => {
  const { token, signout } = useAuth();

  const debouncedSearch = debounce((e) => setSearchInput(e.target.value), 1000);

  return (
    <nav className={`navbar ${styles.navbar}`}>
      <div className={`nav-left ${styles.navLeft}`}>
        <NavLink to="/" className={styles.navLinks}>
          <h1>RabiTube</h1>
        </NavLink>
      </div>
      {search && (
        <div className={styles.searchDesktop}>
          <input
            onChange={debouncedSearch}
            className="search-box"
            type="text"
            placeholder="Search for videos"
          />
        </div>
      )}
      <div className={`nav-right ${styles.navRight}`}>
        <NavLink
          to="/user"
          className={`badge-icon flex-icon ${styles.navLinks}`}
          activeClassName={styles.active}>
          <FaUserCircle />
        </NavLink>
        {token && (
          <button
            className={`btn secondary ${styles.signoutBtn}`}
            onClick={signout}>
            SIGNOUT
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
