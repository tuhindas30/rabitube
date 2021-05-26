export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const handleApiError = (err) => {
  const { data } = err.response;
  console.log(err);
  throw new Error(data.message);
};
