import styles from "./Categorybar.module.css";
import { NavLink } from "react-router-dom";
import { useVideo } from "../../contexts/VideoProvider";

const Categorybar = () => {
  const { categories } = useVideo();
  return (
    <div className={styles.categoriesContainer}>
      <NavLink
        to="/"
        className={`${styles.categoryItem} link`}
        activeClassName={styles.categoryActive}
        end>
        All
      </NavLink>
      {categories.map((category) => (
        <NavLink
          key={category._id}
          to={`/categories/${category._id}`}
          className={`${styles.categoryItem} link`}
          activeClassName={styles.categoryActive}
          end>
          {category.title}
        </NavLink>
      ))}
    </div>
  );
};
export default Categorybar;
