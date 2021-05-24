export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const handleFetchApiResponse = async (resp) => {
  try {
    const { data } = await resp;
    console.log(data);
    if (data.status === "ERROR") {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err.response);
  }
};
