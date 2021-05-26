import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const userId = JSON.parse(localStorage.getItem("login"))?.userId;
const url = `${BASE_URL}/users/${userId}/watchlater`;

const addToWatchlater = async (videoId) => {
  try {
    const { data } = await axios.post(`${url}`, {
      id: videoId,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const removeFromWatchlater = async (videoId) => {
  try {
    const { data } = await axios.delete(`${url}/${videoId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { addToWatchlater, removeFromWatchlater };
