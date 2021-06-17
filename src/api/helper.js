const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleApiError = (err) => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }
  const { data } = err.response;
  throw new Error(data.message);
};

export { BASE_URL, handleApiError };
