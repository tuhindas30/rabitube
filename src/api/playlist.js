import axios from "axios";
import { BASE_URL, handleFetchApiResponse } from "./helper";

const userId = JSON.parse(localStorage.getItem("login"))?.userId;
const url = `${BASE_URL}/users/${userId}/playlists`;

const createNewPlaylist = async (playlistTitle) => {
  const response = await axios.post(`${url}`, {
    title: playlistTitle,
  });
  return await handleFetchApiResponse(response);
};

const deletePlaylist = async (playlistId) => {
  const response = axios.delete(`${url}/${playlistId}`);
  return await handleFetchApiResponse(response);
};

const addToPlaylist = async (playlistId, videoId) => {
  const response = await axios.post(`${url}/${playlistId}`, {
    id: videoId,
  });
  return await handleFetchApiResponse(response);
};

const removeFromPlaylist = async (playlistId, videoId) => {
  const response = await axios.delete(`${url}/${playlistId}/${videoId}`);
  return await handleFetchApiResponse(response);
};

export { createNewPlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist };
