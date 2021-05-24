import * as watchLaterApi from "../api/watchlater";
const useWatchlater = (userDispatch) => {
  const addToWatchlater = async (videoId, title, duration, channel) => {
    try {
      const data = await watchLaterApi.addToWatchlater(videoId);
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "ADD_TO_WATCH_LATER",
          payload: {
            _id: videoId,
            title,
            duration,
            channel,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromWatchlater = async (videoId) => {
    try {
      const data = await watchLaterApi.removeFromWatchlater(videoId);
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "REMOVE_FROM_WATCH_LATER",
          payload: { vId: videoId },
        });
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { addToWatchlater, removeFromWatchlater };
};

export { useWatchlater };
