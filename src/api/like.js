import axios from "axios";
import { BASE_URL, handleFetchApiResponse } from "./helper";

const userId = JSON.parse(localStorage?.getItem("login"))?.userId;
const url = `${BASE_URL}/users/${userId}/liked`;

const addToLike = async (videoId) => {
  const response = await axios.post(`${url}`, {
    id: videoId,
  });
  return await handleFetchApiResponse(response);
};

const removeFromLiked = async (videoId) => {
  const response = await axios.delete(`${url}/${videoId}`);
  return await handleFetchApiResponse(response);
};

export { addToLike, removeFromLiked };
