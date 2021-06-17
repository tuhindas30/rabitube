const historyReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_HISTORY":
      return [...payload.items];
    case "ADD_TO_HISTORY":
      return [...payload.items];
    case "REMOVE_FROM_HISTORY":
      return [...payload.items];
    case "REMOVE_USER_HISTORY":
      return [...payload.items];
    default:
      return state;
  }
};

export default historyReducer;
