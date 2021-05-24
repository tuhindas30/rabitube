import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assests/css/Form.css";
import Navbar from "../components/Navbar/Navbar";

const SignIn = () => {
  const [isPassHidden, setShowPass] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [submitBtn, setSubmitBtn] = useState({
    isDisabled: true,
    isLoading: false,
  });
  const { auth } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    auth.isUserLoggedIn && navigate(state?.from ? state.from : "/");
  }, [auth.isUserLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCredentials.email.length > 0) {
      setSubmitBtn((state) => ({
        ...state,
        isDisabled: true,
        isLoading: true,
      }));
      try {
        await auth.signin(userCredentials);
      } catch (err) {
        console.log(err);
      }
      setSubmitBtn((state) => ({
        ...state,
        isDisabled: false,
        isLoading: false,
      }));
      setUserCredentials({ email: "", password: "" });
      navigate(state?.from ? state.from : "/");
    }
  };

  const handleEmailInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      email: e.target.value,
    }));
  };

  const handlePasswordInput = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      password: e.target.value,
    }));
    if (e.target.value.length >= 8) {
      setSubmitBtn((state) => ({ ...state, isDisabled: false }));
    } else {
      setSubmitBtn((state) => ({ ...state, isDisabled: true }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="form--container">
        <form className="form--control" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <label htmlFor="email">
            <div>Email Address</div>
            <input
              onChange={handleEmailInput}
              type="email"
              name="email"
              value={userCredentials.email}
              required
              autoFocus
            />
          </label>
          <label className="form--pass" htmlFor="password">
            <div>Password</div>
            <input
              onChange={handlePasswordInput}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.password}
              required
            />
            {isPassHidden ? (
              <i
                onClick={() => setShowPass(false)}
                className="bi bi-eye-fill"></i>
            ) : (
              <i
                onClick={() => setShowPass(true)}
                className="bi bi-eye-slash-fill"></i>
            )}
          </label>
          <button
            className={`btn primary ${submitBtn.isDisabled && "disabled-btn"}`}
            type="submit"
            disabled={submitBtn.isDisabled}>
            {submitBtn.isLoading ? "Loading ..." : "Sign In"}
          </button>
          <div className="form--footer">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign up
            </Link>{" "}
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
