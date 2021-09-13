import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useAuth } from "./AuthProvider";
import playlistReducer from "../reducers/playlistReducer";
import * as playlistApi from "../api/playlist";
import showToast from "../utils/showToast";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [playlistState, playlistDispatch] = useReducer(playlistReducer, []);
  const [isPlaylistLoading, setPlaylistLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          setPlaylistLoading(true);
          const response = await playlistApi.getPlaylists();
          if (response.status === "SUCCESS") {
            playlistDispatch({
              type: "INITIALISE_PLAYLISTS",
              payload: { playlists: response.data.playlists },
            });
          }
        } catch (err) {
          playlistDispatch({
            type: "INITIALISE_PLAYLISTS",
            payload: { playlists: [] },
          });
        } finally {
          setPlaylistLoading(false);
        }
      })();
    }
  }, [token]);

  const createNewPlaylist = async (title, videoId) => {
    if (token) {
      try {
        setPlaylistLoading(true);
        const response = await playlistApi.createNewPlaylist(title, videoId);
        if (response.status === "SUCCESS") {
          playlistDispatch({
            type: "ADD_PLAYLIST",
            payload: { playlists: response.data.playlists },
          });
          showToast(`New playlist ${title} created successfully`);
        }
      } catch (err) {
        showToast("Something went wrong. Please try again :)");
      } finally {
        setPlaylistLoading(false);
      }
    } else {
      alert("Login to create playlist");
    }
  };

  const deletePlaylist = async (playlistId) => {
    if (token) {
      try {
        const response = await playlistApi.deletePlaylist(playlistId);
        if (response.status === "SUCCESS") {
          playlistDispatch({
            type: "DELETE_PLAYLIST",
            payload: { playlists: response.data.playlists },
          });
          showToast(`Playlist deleted successfully`);
        }
      } catch (err) {
        showToast("Something went wrong. Please try again :)");
      } finally {
        setPlaylistLoading(false);
      }
    } else {
      alert("Login to delete playlist");
    }
  };

  const addToPlaylist = async (playlistId, videoId) => {
    if (token) {
      try {
        setPlaylistLoading(true);
        const response = await playlistApi.addToPlaylist(playlistId, videoId);
        if (response.status === "SUCCESS") {
          playlistDispatch({
            type: "ADD_TO_PLAYLIST",
            payload: { playlists: response.data.playlists },
          });
          showToast("Video added to playlist successfully");
        }
      } catch (err) {
        showToast("Something went wrong. Please try again :)");
      } finally {
        setPlaylistLoading(false);
      }
    } else {
      alert("Login to add video to playlist");
    }
  };

  const removeFromPlaylist = async (playlistId, videoId) => {
    try {
      setPlaylistLoading(true);
      const response = await playlistApi.removeFromPlaylist(
        playlistId,
        videoId
      );
      if (response.status === "SUCCESS") {
        playlistDispatch({
          type: "REMOVE_FROM_PLAYLIST",
          payload: { playlists: response.data.playlists },
        });
        showToast("Video removed from playlist successfully");
      }
    } catch (err) {
      showToast("Something went wrong. Please try again :)");
    } finally {
      setPlaylistLoading(false);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        isPlaylistLoading,
        playlistState,
        createNewPlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { PlaylistProvider, usePlaylist };
