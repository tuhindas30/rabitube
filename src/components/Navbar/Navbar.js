import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSearch } from "../../contexts/SearchProvider";

const NavbarWithSearch = ({ search = false }) => {
  const { searchInput, setSearchInput } = useSearch();

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
        <i className="bi bi-search search-mobile"></i>
        <Link to="/user" className="nav-link">
          <i className="bi bi-person-circle"></i>
        </Link>
      </div>
    </nav>
  );
};
export default NavbarWithSearch;
