import "../assests/css/categorybar.css";
import { NavLink } from "react-router-dom";

const CategoryBar = () => {
  return (
    <div className="categories--container">
      <NavLink
        to="/"
        className="link category-item"
        activeClassName="category__active"
        end
      >
        All
      </NavLink>
      <NavLink
        to="/categories/tagore-songs"
        className="link category-item"
        activeClassName="category__active"
        end
      >
        Tagore Songs
      </NavLink>
      <NavLink
        to="/categories/guitar-tutorials"
        className="link category-item"
        activeClassName="category__active"
        end
      >
        Guitar Tutorials
      </NavLink>
    </div>
  );
};
export default CategoryBar;
