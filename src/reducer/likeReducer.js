const likeReducer = (state, { type, payload }) => {
  switch (type) {
    case "LIKE_TOGGLE":
      if (state.some((item) => item.v_id === payload.v_id)) {
        return state.filter((item) => item.v_id !== payload.v_id);
      }
      return [...state, { ...payload }];

    case "REMOVE":
      payload.setDeleteModalVisibility("hide");
      return state.filter((item) => item.v_id !== payload.v_id);

    default:
      return state;
  }
};

export default likeReducer;
