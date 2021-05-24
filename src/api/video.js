import axios from "axios";
import { BASE_URL, handleFetchApiResponse } from "./helper";

const url = `${BASE_URL}/videos`;

const getAllVideos = async () => {
  const response = await axios.get(`${url}`);
  return await handleFetchApiResponse(response);
};

export { getAllVideos };
