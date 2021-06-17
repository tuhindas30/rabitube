import axios from "axios";
import { BASE_URL, handleApiError } from "./helper";

const url = `${BASE_URL}/users/history`;

const getHistory = async () => {
  try {
    const { data } = await axios.get(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const addToHistory = async (videoId) => {
  try {
    const { data } = await axios.post(`${url}`, {
      videoId,
    });
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const removeFromHistory = async (videoId) => {
  try {
    const { data } = await axios.delete(`${url}/${videoId}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

const removeUserHistory = async () => {
  try {
    const { data } = await axios.delete(`${url}`);
    return data;
  } catch (err) {
    return handleApiError(err);
  }
};

export { getHistory, addToHistory, removeFromHistory, removeUserHistory };
