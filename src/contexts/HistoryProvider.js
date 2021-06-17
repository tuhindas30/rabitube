import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import historyReducer from "../reducers/historyReducer";
import * as historyApi from "../api/history";
import axios from "axios";
import { setupCancelToken } from "../utils/helper";
import showToast from "../utils/showToast";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [historyState, historyDispatch] = useReducer(historyReducer, []);
  const [isHistoryLoading, setHistoryLoading] = useState(false);
  const { token } = useAuth();
  const source = axios.CancelToken.source();
  setupCancelToken(source);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setHistoryLoading(true);
          const response = await historyApi.getHistory();
          if (response.status === "SUCCESS") {
            historyDispatch({
              type: "INITIALISE_HISTORY",
              payload: { items: response.data.items },
            });
          }
        } catch (err) {
          historyDispatch({
            type: "INITIALISE_HISTORY",
            payload: { items: [] },
          });
        } finally {
          setHistoryLoading(false);
        }
      })();
    } else {
      historyDispatch({
        type: "INITIALISE_HISTORY",
        payload: { items: [] },
      });
    }
    return () => source.cancel("history unmounted");
  }, [token]);

  const addToHistory = async (videoId) => {
    if (token) {
      try {
        setHistoryLoading(true);
        const response = await historyApi.addToHistory(videoId);
        if (response.status === "SUCCESS") {
          historyDispatch({
            type: "ADD_TO_HISTORY",
            payload: { items: response.data.items },
          });
        }
      } catch (err) {
        showToast("Something went wrong. Please try again :)");
      } finally {
        setHistoryLoading(false);
      }
    }
  };

  const removeFromHistory = async (videoId) => {
    try {
      const response = await historyApi.removeFromHistory(videoId);
      if (response.status === "SUCCESS") {
        historyDispatch({
          type: "REMOVE_FROM_HISTORY",
          payload: { items: response.data.items },
        });
        showToast("Video removed from history successfully");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
    } finally {
      setHistoryLoading(false);
    }
  };

  const removeUserHistory = async () => {
    try {
      const response = await historyApi.removeUserHistory();
      if (response.status === "SUCCESS") {
        historyDispatch({
          type: "REMOVE_USER_HISTORY",
          payload: { items: response.data.items },
        });
        showToast("User history deleted successfully");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        isHistoryLoading,
        historyState,
        addToHistory,
        removeFromHistory,
        removeUserHistory,
      }}>
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { HistoryProvider, useHistory };
