import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import likeReducer from "../reducers/likeReducer";
import * as likeApi from "../api/like";
import showToast from "../utils/showToast";
import axios from "axios";
import { setupCancelToken } from "../utils/helper";

const LikeContext = createContext();

const LikeProvider = ({ children }) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, []);
  const [isLikeLoading, setLikeLoading] = useState(false);
  const { token } = useAuth();
  const source = axios.CancelToken.source();
  setupCancelToken(source);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setLikeLoading(true);
          const response = await likeApi.getLikedPlaylist();
          if (response.status === "SUCCESS") {
            likeDispatch({
              type: "INITIALISE_LIKE",
              payload: { items: response.data.items },
            });
          }
        } catch (err) {
          likeDispatch({
            type: "INITIALISE_LIKE",
            payload: { items: [] },
          });
        } finally {
          setLikeLoading(false);
        }
      })();
    } else {
      likeDispatch({
        type: "INITIALISE_LIKE",
        payload: { items: [] },
      });
    }
    return () => source.cancel("like unmounted");
  }, [token]);

  const addToLikedPlaylist = async (videoId) => {
    if (token) {
      try {
        setLikeLoading(true);
        const response = await likeApi.addToLikedPlaylist(videoId);
        if (response.status === "SUCCESS") {
          likeDispatch({
            type: "ADD_TO_LIKED",
            payload: { items: response.data.items },
          });
          showToast("Video added to liked playlist successfully");
        }
      } catch (err) {
        showToast("Something went wrong. Please try again :)");
      } finally {
        setLikeLoading(false);
      }
    } else {
      alert("Login to add video to likes");
    }
  };

  const removeFromLikedPlaylist = async (videoId) => {
    try {
      setLikeLoading(true);
      const response = await likeApi.removeFromLikedPlaylist(videoId);
      if (response.status === "SUCCESS") {
        likeDispatch({
          type: "REMOVE_FROM_LIKED",
          payload: { items: response.data.items },
        });
        showToast("Video removed from liked playlist successfully");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <LikeContext.Provider
      value={{
        isLikeLoading,
        likeState,
        addToLikedPlaylist,
        removeFromLikedPlaylist,
      }}>
      {children}
    </LikeContext.Provider>
  );
};

const useLike = () => useContext(LikeContext);

export { LikeProvider, useLike };
