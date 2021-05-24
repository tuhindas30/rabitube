import * as playlistApi from "../api/playlist";

const usePlaylist = (userDispatch) => {
  const createNewPlaylist = async (playlistTitle) => {
    try {
      const data = await playlistApi.createNewPlaylist(playlistTitle);
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "CREATE_NEW_PLAYLIST",
          payload: { playlists: data.playlists },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToPlaylist = async (pId, vId, title, duration, channel) => {
    try {
      const data = await playlistApi.addToPlaylist(pId, vId);
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "ADD_TO_PLAYLIST",
          payload: { _id: vId, pId, title, duration, channel },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deletePlaylist = async (playlistId) => {
    try {
      const data = await playlistApi.deletePlaylist(playlistId);
      if (data.status === "SUCCESS") {
        userDispatch({ type: "DELETE_PLAYLIST", payload: { pId: playlistId } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromPlaylist = async (playlistId, videoId) => {
    try {
      const data = await playlistApi.removeFromPlaylist(playlistId, videoId);
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "REMOVE_FROM_PLAYLIST",
          payload: { pId: playlistId, vId: videoId },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {
    createNewPlaylist,
    addToPlaylist,
    deletePlaylist,
    removeFromPlaylist,
  };
};

export { usePlaylist };
