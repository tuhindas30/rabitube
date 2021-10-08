const playlistReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALISE_PLAYLISTS":
      return [...payload.playlists];
    case "ADD_PLAYLIST":
      return [...payload.playlists];
    case "DELETE_PLAYLIST":
      return [...payload.playlists];
    case "ADD_TO_PLAYLIST":
      return [...payload.playlists];
    case "REMOVE_FROM_PLAYLIST":
      return [...payload.playlists];
    default:
      return state;
  }
};

export default playlistReducer;
