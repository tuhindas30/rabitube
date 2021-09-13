import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import * as authApi from "../api/auth";
import * as userApi from "../api/user";
import { setupAuthExceptionHandler, setupAuthHeader } from "../utils/helper";
import { useNavigate } from "react-router";
import showToast from "../utils/showToast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = JSON.parse(localStorage?.getItem("__auth_token")) || null;
  const user = JSON.parse(localStorage?.getItem("__auth_user")) || null;
  const [isUserLoading, setUserLoading] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const navigate = useNavigate();
  token && setupAuthHeader(token);

  useEffect(() => {
    setupAuthExceptionHandler(signout, navigate);
  }, []);

  useEffect(() => {
    if (token) {
      try {
        setUserLoading(true);
        const decodedToken = jwt_decode(token);
        setTokenExpiry(decodedToken.exp);
        if (decodedToken.exp < Date.now() / 1000) {
          throw new Error("Session Expired");
        }
      } catch (err) {
        alert(`${err.message}\nPlease sign-in again`);
        signout();
      } finally {
        setUserLoading(false);
      }
    }
  }, [token]);

  const getToken = () => {
    if (tokenExpiry && tokenExpiry < Date.now() / 1000) {
      alert(`Session Expired\nPlease sign-in again`);
      signout();
      navigate("/signin");
    }
    return token;
  };

  const signup = async ({ username, email, password }) => {
    try {
      await authApi.signup(username, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  const signin = async ({ email, password }) => {
    try {
      const response = await authApi.signin(email, password);
      if (response.status === "SUCCESS") {
        localStorage?.setItem(
          "__auth_user",
          JSON.stringify(response.data.user)
        );
        localStorage?.setItem(
          "__auth_token",
          JSON.stringify(response.data.token)
        );
        setupAuthHeader(response.data.token);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const signout = () => {
    localStorage.removeItem("__auth_token");
    localStorage.removeItem("__auth_user");
    setTokenExpiry(null);
    setupAuthHeader(null);
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      setUserLoading(true);
      await authApi.changePassword(oldPassword, newPassword);
      showToast("Password updated successfully");
      signout();
    } catch (err) {
      alert(err.message);
    } finally {
      setUserLoading(false);
    }
  };

  const updateUser = async (emailId) => {
    setUserLoading(true);
    try {
      const response = await userApi.updateUserById(user.id, emailId);
      if (response.status === "SUCCESS") {
        localStorage?.setItem("__auth_user", JSON.stringify(response.data));
        setUserLoading(false);
        showToast("Email updated successfully");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        user,
        token: getToken(),
        signup,
        signin,
        signout,
        changePassword,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
