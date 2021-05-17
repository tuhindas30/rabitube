const userReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER_DATA":
      return { ...payload.user };
    case "ADD_TO_WATCH_LATER":
      return { ...state, watchlater: [...state.watchlater, payload] };
    case "ADD_TO_LIKED":
      return { ...state, liked: [...state.liked, payload] };
    case "REMOVE_FROM_LIKED":
      const updatedLiked = state.liked.filter(
        (video) => video._id !== payload.vId
      );
      return { ...state, liked: updatedLiked };
    case "CREATE_PLAYLIST":
      return {
        ...state,
        playlists: [...payload.playlists],
      };
    case "DELETE_PLAYLIST":
      const updatedUserPlaylists = state.playlists.filter(
        (playlist) => playlist._id !== payload.pId
      );
      return { ...state, playlists: updatedUserPlaylists };
    case "ADD_TO_PLAYLIST":
      const updatedPlaylist = state.playlists.map((playlist) => {
        if (playlist._id === payload.pId) {
          return { ...playlist, videos: [...playlist.videos, { ...payload }] };
        }
        return playlist;
      });
      return { ...state, playlists: updatedPlaylist };
    case "DELETE_FROM_PLAYLIST":
      const updatePlaylist = state.playlists.map((playlist) => {
        if (playlist._id === payload.pId) {
          const videos = playlist.videos.filter(
            (item) => item._id !== payload.vId
          );
          return { ...playlist, videos };
        }
        return playlist;
      });
      return { ...state, playlists: updatePlaylist };
    case "REMOVE_VIDEO":
      const updatedWatchlater = state.watchlater.filter(
        (video) => video._id !== payload.vId
      );
      return { ...state, watchlater: updatedWatchlater };
    default:
      return state;
  }
};

export default userReducer;
