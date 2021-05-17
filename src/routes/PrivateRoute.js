import { Navigate, Route } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoute = ({ path, ...rest }) => {
  const { isUserLoggedIn } = useAuth();
  return isUserLoggedIn ? (
    <Route {...rest} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/signin" />
  );
};
export default PrivateRoute;
