import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/videos`;

const getAllVideos = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const getVideoById = async (videoId) => {
  try {
    const { data } = await axios.get(`${url}/${videoId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const createNewVideo = async (videoData) => {
  try {
    const { data } = await axios.post(`${url}`, videoData);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const updateVideoById = async (videoId, updateData) => {
  try {
    const { data } = await axios.post(`${url}/${videoId}`, updateData);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const deleteVideoById = async (videoId) => {
  try {
    const { data } = await axios.delete(`${url}/${videoId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export {
  getAllVideos,
  getVideoById,
  createNewVideo,
  updateVideoById,
  deleteVideoById,
};
