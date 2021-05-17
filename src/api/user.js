import axios from "axios";
import { BASE_URL } from "../api/helper";

const registerUser = async (username, email, password) => {
  try {
    const url = `${BASE_URL}/users`;
    await axios.post(url, { username, email, password });
  } catch (error) {
    console.log(error.message);
  }
};

export default registerUser;
