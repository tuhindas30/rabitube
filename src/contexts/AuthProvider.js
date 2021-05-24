import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import userReducer from "../reducer/userReducer";
import * as authApi from "../api/auth";
import * as userApi from "../api/user";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, {});
  const auth = useProvideAuth(userDispatch);
  const loginStatus = JSON.parse(localStorage?.getItem("login"));

  useEffect(() => {
    loginStatus?.isUserLoggedIn &&
      (async () => {
        const data = await userApi.getUser();
        userDispatch({ type: "SET_USER_DATA", payload: { user: data.user } });
      })();
    loginStatus?.isUserLoggedIn && auth.setLogin(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userState,
        userDispatch,
        auth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = (userDispatch) => {
  const [isUserLoggedIn, setLogin] = useState(false);

  const signin = async ({ email, password }) => {
    try {
      const data = await authApi.signin(email, password);
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
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async ({ username, email, password }) => {
    try {
      await authApi.signup(username, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      await authApi.changePassword(oldPassword, newPassword);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async (emailId) => {
    try {
      await userApi.updateUser(emailId);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    isUserLoggedIn,
    setLogin,
    signin,
    signup,
    changePassword,
    updateUser,
  };
};

export { AuthProvider, useAuth };
