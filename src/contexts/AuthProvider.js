import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import userReducer from "../reducer/userReducer";
import { BASE_URL } from "../api/helper";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);
  const [userState, userDispatch] = useReducer(userReducer, {});
  const url = `${BASE_URL}/users`;

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));
    loginStatus?.isUserLoggedIn &&
      (async () => {
        const { data } = await axios.get(`${url}/${loginStatus?.userId}`);
        userDispatch({ type: "SET_USER_DATA", payload: { user: data.user } });
      })();
    loginStatus?.isUserLoggedIn && setLogin(true);
  }, [url]);

  const loginUserWithCredentials = async (userCredentials) => {
    try {
      const { data } = await axios.post(`${url}/signin`, userCredentials);
      if (data.status === "SUCCESS") {
        setLogin(true);
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLoggedIn: true,
            userId: data.user._id,
          })
        );
        userDispatch({ type: "SET_USER_DATA", payload: { user: data.user } });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setLogin,
        loginUserWithCredentials,
        userState,
        userDispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
