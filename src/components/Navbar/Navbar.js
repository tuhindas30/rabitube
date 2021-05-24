import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSearch } from "../../contexts/SearchProvider";
import { useAuth } from "../../contexts/AuthProvider";

const NavbarWithSearch = ({ search = false }) => {
  const { searchInput, setSearchInput } = useSearch();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleLogoutBtn = () => {
    localStorage.removeItem("login");
    auth.setLogin(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        <div className="nav-left">
          <div className="nav-brand">
            <h1>RabiTube</h1>
          </div>
        </div>
      </Link>

      <form className={search ? "search-desktop" : "search-desktop-none"}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-box"
          type="text"
        />
      </form>

      <div className="nav-right nav-right--large">
        <Link to="/user" className="nav-link">
          <i className="bi bi-person-circle"></i>
        </Link>
        {auth.isUserLoggedIn && (
          <button onClick={handleLogoutBtn} className="btn primary">
            Signout
          </button>
        )}
      </div>
    </nav>
  );
};
export default NavbarWithSearch;
