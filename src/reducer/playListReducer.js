import { v4 as uuid } from "uuid";

const playListReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_NEW_PLAYLIST":
      payload.setInputPlayListName("");
      return [
        ...state,
        { p_id: uuid(), name: payload.inputPlayListName, videos: [] },
      ];

    case "ADD_TO_PLAYLIST":
      return state.map((playlist) => {
        if (playlist.p_id === payload.p_id) {
          if (playlist.videos.some((item) => item.v_id === payload.v_id)) {
            const videos = playlist.videos.filter(
              (item) => item.v_id !== payload.v_id
            );
            return { ...playlist, videos };
          }
          return {
            ...playlist,
            videos: [...playlist.videos, { ...payload }],
          };
        }
        return playlist;
      });

    case "DELETE_PLAYLIST":
      return state.filter((playlist) => playlist.p_id !== payload.p_id);

    case "REMOVE":
      payload.setDeleteModalVisibility("hide");
      return state.map((playlist) => {
        if (playlist.p_id === payload.p_id) {
          if (playlist.videos.some((item) => item.v_id === payload.v_id)) {
            const videos = playlist.videos.filter(
              (item) => item.v_id !== payload.v_id
            );
            return { ...playlist, videos };
          }
          return playlist;
        }
        return playlist;
      });

    default:
      return state;
  }
};
export default playListReducer;
