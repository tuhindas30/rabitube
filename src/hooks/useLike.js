import * as likeApi from "../api/like";

const useLike = (userDispatch) => {
  const addToLike = async (videoId, title, channel) => {
    try {
      const data = await likeApi.addToLike(videoId);
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "ADD_TO_LIKED_PLAYLIST",
          payload: { _id: videoId, title, channel },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const removeFromLike = async (videoId) => {
    try {
      const data = await likeApi.removeFromLiked(videoId);
      if (data.status === "SUCCESS") {
        userDispatch({
          type: "REMOVE_FROM_LIKED_PLAYLIST",
          payload: { vId: videoId },
        });
      }
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { addToLike, removeFromLike };
};

export { useLike };
