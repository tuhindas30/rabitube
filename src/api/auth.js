import axios from "axios";
import { BASE_URL, handleFetchApiResponse } from "./helper";

const userId = JSON.parse(localStorage?.getItem("login"))?.userId;
const url = `${BASE_URL}/auth`;

const signin = async (email, password) => {
  const response = await axios.post(`${url}/signin`, { email, password });
  return await handleFetchApiResponse(response);
};

const signup = async (username, email, password) => {
  const response = axios.post(`${url}/signup`, { username, email, password });
  return await handleFetchApiResponse(response);
};

const changePassword = async (oldPassword, newPassword) => {
  const response = await axios.post(`${url}/change-password`, {
    userId: userId,
    oldPassword,
    newPassword,
  });
  return await handleFetchApiResponse(response);
};

export { signin, signup, changePassword };
