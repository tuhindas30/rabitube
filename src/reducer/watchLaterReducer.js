const watchLaterReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_WATCH_LATER":
      if (state.some((video) => video.v_id === payload.info.v_id)) {
        return state;
      }
      return [...state, { ...payload.info }];

    case "REMOVE":
      payload.setDeleteModalVisibility("hide");
      return state.filter((video) => video.v_id !== payload.v_id);

    default:
      return state;
  }
};
export default watchLaterReducer;
