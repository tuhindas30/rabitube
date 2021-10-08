import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/users/liked`;

const getLikedPlaylist = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const addToLikedPlaylist = async (videoId) => {
  try {
    const { data } = await axios.post(`${url}`, {
      videoId,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const removeFromLikedPlaylist = async (videoId) => {
  try {
    const { data } = await axios.delete(`${url}/${videoId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { getLikedPlaylist, addToLikedPlaylist, removeFromLikedPlaylist };
