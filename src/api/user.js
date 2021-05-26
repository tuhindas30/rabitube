import axios from "axios";
import { BASE_URL, handleApiError } from "../api/helper";

const userId = JSON.parse(localStorage?.getItem("login"))?.userId;
const url = `${BASE_URL}/users`;

const registerUser = async (username, email, password) => {
  try {
    const { data } = await axios.post(url, { username, email, password });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const getUser = async () => {
  try {
    const { data } = await axios.get(`${url}/${userId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateUser = async (emailId) => {
  try {
    const { data } = await axios.post(`${url}/${userId}`, {
      email: emailId,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export default registerUser;
export { getUser, updateUser };
