import { useRef } from "react";
import "../assests/css/navbar.css";
import useOnScrollNavbarAnimation from "../hooks/useOnScrollNavbarAnimation";
const NavBar = () => {
  const scrollRef = useRef(null);
  useOnScrollNavbarAnimation(scrollRef);
  return (
    <>
      <nav ref={scrollRef} className="navbar">
        <div className="nav-left">
          <div className="nav-brand">
            <h1>RabiTube</h1>
          </div>
        </div>
        <div className="nav-right nav-right--large">
          <i className="bi bi-search"></i>
          <i className="bi bi-person-circle"></i>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
