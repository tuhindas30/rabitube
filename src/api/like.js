import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const userId = JSON.parse(localStorage?.getItem("login"))?.userId;
const url = `${BASE_URL}/users/${userId}/liked`;

const addToLike = async (videoId) => {
  try {
    const { data } = await axios.post(`${url}`, {
      id: videoId,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const removeFromLiked = async (videoId) => {
  try {
    const { data } = await axios.delete(`${url}/${videoId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { addToLike, removeFromLiked };
