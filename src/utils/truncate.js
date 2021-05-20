const truncate = (string, limit) => {
  if (string?.length <= limit) return string;
  return string?.slice(0, limit) + "...";
};

export default truncate;
