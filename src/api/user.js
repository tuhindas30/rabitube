import axios from "axios";
import { BASE_URL, handleFetchApiResponse } from "../api/helper";

const userId = JSON.parse(localStorage?.getItem("login"))?.userId;
const url = `${BASE_URL}/users`;

const registerUser = async (username, email, password) => {
  try {
    await axios.post(url, { username, email, password });
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async () => {
  const response = await axios.get(`${url}/${userId}`);
  return await handleFetchApiResponse(response);
};

const updateUser = async (emailId) => {
  const response = await axios.post(`${url}/${userId}`, {
    email: emailId,
  });
  return await handleFetchApiResponse(response);
};

export default registerUser;
export { getUser, updateUser };
