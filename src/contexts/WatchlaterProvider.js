import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import watchlaterReducer from "../reducers/watchlaterReducer";
import * as watchlaterApi from "../api/watchlater";
import showToast from "../utils/showToast";
import axios from "axios";
import { setupCancelToken } from "../utils/helper";

const WatchlaterContext = createContext();

const WatchlaterProvider = ({ children }) => {
  const [watchlaterState, watchlaterDispatch] = useReducer(
    watchlaterReducer,
    []
  );
  const [isWatchlaterLoading, setWatchlaterLoading] = useState(false);
  const { token } = useAuth();
  const source = axios.CancelToken.source();
  setupCancelToken(source);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setWatchlaterLoading(true);
          const response = await watchlaterApi.getWatchlater();
          if (response.status === "SUCCESS") {
            watchlaterDispatch({
              type: "INITIALISE_WATCHLATER",
              payload: { items: response.data.items },
            });
          }
        } catch (err) {
          watchlaterDispatch({
            type: "INITIALISE_WATCHLATER",
            payload: { items: [] },
          });
        } finally {
          setWatchlaterLoading(false);
        }
      })();
    }
    return () => source.cancel("watchlater unmounted");
  }, [token]);

  const addToWatchlater = async (videoId) => {
    if (token) {
      try {
        setWatchlaterLoading(true);
        const response = await watchlaterApi.addToWatchlater(videoId);
        if (response.status === "SUCCESS") {
          watchlaterDispatch({
            type: "ADD_TO_WATCHLATER",
            payload: { items: response.data.items },
          });
          showToast("Video added to watchlater successfully");
        }
      } catch (err) {
        showToast("Something went wrong. Please try again :)");
      } finally {
        setWatchlaterLoading(false);
      }
    } else {
      alert("Login to add video to watchlater");
    }
  };

  const removeFromWatchlater = async (videoId) => {
    try {
      setWatchlaterLoading(true);
      const response = await watchlaterApi.removeFromWatchlater(videoId);
      if (response.status === "SUCCESS") {
        watchlaterDispatch({
          type: "REMOVE_FROM_WATCHLATER",
          payload: { items: response.data.items },
        });
        showToast("Video removed from watchlater successfully");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
    } finally {
      setWatchlaterLoading(false);
    }
  };

  return (
    <WatchlaterContext.Provider
      value={{
        isWatchlaterLoading,
        watchlaterState,
        addToWatchlater,
        removeFromWatchlater,
      }}>
      {children}
    </WatchlaterContext.Provider>
  );
};

const useWatchlater = () => useContext(WatchlaterContext);

export { WatchlaterProvider, useWatchlater };
