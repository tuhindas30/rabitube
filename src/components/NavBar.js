import { useRef } from "react";
import { Link } from "react-router-dom";
import "../assests/css/navbar.css";
import { useSearch } from "../contexts/SearchProvider";
const NavBar = () => {
	const scrollRef = useRef(null);
	const { searchInput, setSearchInput } = useSearch();

	return (
		<nav ref={scrollRef} className="navbar">
			<Link to="/" className="nav-link">
				<div className="nav-left">
					<div className="nav-brand">
						<h1>RabiTube</h1>
					</div>
				</div>
			</Link>

			<form id="search-form" className="search-desktop" action="">
				<input
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					className="search-box"
					type="text"
				/>
				<button className="search-button">
					<i className="bi bi-search"></i>
				</button>
			</form>

			<div className="nav-right nav-right--large">
				<i className="bi bi-search search-mobile"></i>
				<i className="bi bi-person-circle"></i>
			</div>
		</nav>
	);
};
export default NavBar;
