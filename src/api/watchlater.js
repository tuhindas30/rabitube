import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/users/watchlater`;

const getWatchlater = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const addToWatchlater = async (videoId) => {
  try {
    const { data } = await axios.post(`${url}`, {
      videoId,
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

export { getWatchlater, addToWatchlater, removeFromWatchlater };
