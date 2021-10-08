const watchlaterReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_WATCHLATER":
      return [...payload.items];
    case "ADD_TO_WATCHLATER":
      return [...payload.items];
    case "REMOVE_FROM_WATCHLATER":
      return [...payload.items];
    default:
      return state;
  }
};

export default watchlaterReducer;
