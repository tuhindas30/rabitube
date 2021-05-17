import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assests/css/Form.css";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../contexts/AuthProvider";

const SignIn = () => {
  const [isPassHidden, setShowPass] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [isSubmitDisabled, setSubmitBtn] = useState(true);
  const { isUserLoggedIn, loginUserWithCredentials } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    isUserLoggedIn && navigate(state?.from ? state.from : "/");
  }, [isUserLoggedIn]);

  const handleUserVerify = async () => {
    if (userCredentials.email.length > 0) {
      await loginUserWithCredentials(userCredentials);
      setUserCredentials({ email: "", password: "" });
      navigate(state?.from ? state.from : "/");
    }
  };

  const handlePasswordEntry = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      password: e.target.value,
    }));
    if (e.target.value.length >= 8) {
      setSubmitBtn(false);
    } else {
      setSubmitBtn(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form--container">
        <form className="form--control" onSubmit={(e) => e.preventDefault()}>
          <h1>Sign In</h1>
          <label htmlFor="email">
            <div>Email Address</div>
            <input
              onChange={(e) =>
                setUserCredentials((credentials) => ({
                  ...credentials,
                  email: e.target.value,
                }))
              }
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
              onChange={handlePasswordEntry}
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
            onClick={handleUserVerify}
            className={`btn primary ${isSubmitDisabled && "disabled-btn"}`}
            type="submit"
            disabled={isSubmitDisabled}>
            Sign In
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
