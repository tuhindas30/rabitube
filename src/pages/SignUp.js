import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerUser from "../api/user";
import "../assests/css/Form.css";
import Navbar from "../components/Navbar/Navbar";

const SignUp = () => {
  const [isPassHidden, setShowPass] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitDisabled, setSubmitBtn] = useState(true);
  const navigate = useNavigate();

  const handleUserRegister = async () => {
    if (userCredentials.email.length > 0) {
      await registerUser(
        userCredentials.username,
        userCredentials.email,
        userCredentials.password
      );
      setUserCredentials({ username: "", email: "", password: "" });
      navigate("/signin");
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
          <h1>Sign Up</h1>
          <label htmlFor="email">
            <div>Username</div>
            <input
              onChange={(e) =>
                setUserCredentials((credentials) => ({
                  ...credentials,
                  username: e.target.value,
                }))
              }
              value={userCredentials.username}
              type="text"
              name="username"
              required
              autoFocus
            />
          </label>
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
            onClick={handleUserRegister}
            className={`btn primary ${isSubmitDisabled && "disabled-btn"}`}
            type="submit"
            disabled={isSubmitDisabled}>
            Sign Up
          </button>
          <div className="form--footer">
            Already a user?{" "}
            <Link to="/signin" className="link">
              Sign In
            </Link>{" "}
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
