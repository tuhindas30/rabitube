import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/users/playlists`;

const getPlaylists = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const createNewPlaylist = async (title, videoId) => {
  try {
    const { data } = await axios.post(`${url}`, {
      title,
      videoId,
    });
    return data;
  } catch (err) {
    handleApiError(err);
  }
};

const deletePlaylist = async (playlistId) => {
  try {
    const { data } = await axios.delete(`${url}/${playlistId}`);
    return data;
  } catch (err) {
    handleApiError(err);
  }
};

const addToPlaylist = async (playlistId, videoId) => {
  try {
    const { data } = await axios.post(`${url}/${playlistId}`, {
      videoId,
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

export {
  getPlaylists,
  createNewPlaylist,
  deletePlaylist,
  addToPlaylist,
  removeFromPlaylist,
};
