import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../api/helper";
import "../assests/css/Form.css";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../contexts/AuthProvider";

const SignUp = () => {
  const [isPassHidden, setShowPass] = useState(true);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitDisabled, setSubmitBtn] = useState(true);
  const { userState } = useAuth();
  const url = `${BASE_URL}/users/${userState._id}`;
  const handleUpdateUser = async () => {
    if (userCredentials.email.length > 0) {
      try {
        const { data } = await axios.post(url, {
          email: userCredentials.email,
        });
        console.log(data);
        setUserCredentials((credentials) => ({ ...credentials, email: "" }));
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleOldPasswordEntry = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      oldPassword: e.target.value,
    }));
  };

  const handleNewPasswordEntry = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      newPassword: e.target.value,
    }));
  };

  const handleConfirmPasswordEntry = (e) => {
    setUserCredentials((credentials) => ({
      ...credentials,
      confirmPassword: e.target.value,
    }));
    if (userCredentials.newPassword === e.target.value) {
      setSubmitBtn(false);
    } else {
      setSubmitBtn(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form--container justify-space">
        <form className="form--control" onSubmit={(e) => e.preventDefault()}>
          <h1>Update Info</h1>
          <label htmlFor="email">
            <div>Username</div>
            <input
              value={userState.username}
              type="text"
              name="username"
              disabled
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
          <button
            onClick={handleUpdateUser}
            className="btn primary"
            type="submit">
            Update
          </button>
        </form>
        <form className="form--control">
          <h1>Change Password</h1>
          <label className="form--pass" htmlFor="password">
            <div>Old Password</div>
            <input
              onChange={handleOldPasswordEntry}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.oldPassword}
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
          <label className="form--pass" htmlFor="password">
            <div>New Password</div>
            <input
              onChange={handleNewPasswordEntry}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.newPassword}
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
          <label className="form--pass" htmlFor="password">
            <div>Confirm new Password</div>
            <input
              onChange={handleConfirmPasswordEntry}
              type={isPassHidden ? "password" : "text"}
              name="password"
              value={userCredentials.confirmPassword}
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
            // onClick={handleUpdateUser}
            className={`btn primary ${isSubmitDisabled && "disabled-btn"}`}
            type="submit"
            disabled={isSubmitDisabled}>
            Change Password
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
