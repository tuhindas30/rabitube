const likeReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_LIKE":
      return [...payload.items];
    case "ADD_TO_LIKED":
      return [...payload.items];
    case "REMOVE_FROM_LIKED":
      return [...payload.items];
    default:
      return state;
  }
};

export default likeReducer;
