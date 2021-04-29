import { createContext, useContext, useReducer } from "react";
import playListReducer from "../reducer/playListReducer";
import { v4 as uuid } from "uuid";

const PlayListsContext = createContext();

const PlayListsProvider = ({ children }) => {
  const [playListState, playListDispatch] = useReducer(playListReducer, [
    {
      p_id: uuid(),
      name: "My Playlist",
      videos: [],
    },
  ]);

  return (
    <PlayListsContext.Provider value={{ playListState, playListDispatch }}>
      {children}
    </PlayListsContext.Provider>
  );
};

const usePlaylists = () => {
  return useContext(PlayListsContext);
};

export { PlayListsProvider, usePlaylists };
