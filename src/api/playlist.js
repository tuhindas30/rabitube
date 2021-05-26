import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const userId = JSON.parse(localStorage.getItem("login"))?.userId;
const url = `${BASE_URL}/users/${userId}/playlists`;

const createNewPlaylist = async (playlistTitle) => {
  try {
    const { data } = await axios.post(`${url}`, {
      title: playlistTitle,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const deletePlaylist = async (playlistId) => {
  try {
    const { data } = axios.delete(`${url}/${playlistId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const addToPlaylist = async (playlistId, videoId) => {
  try {
    const { data } = await axios.post(`${url}/${playlistId}`, {
      id: videoId,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const removeFromPlaylist = async (playlistId, videoId) => {
  try {
    const { data } = await axios.delete(`${url}/${playlistId}/${videoId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { createNewPlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist };
