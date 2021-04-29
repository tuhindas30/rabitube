import { createContext, useContext, useReducer } from "react";
import likeReducer from "../reducer/likeReducer";

const LikeContext = createContext();

const LikeProvider = ({ children }) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, []);

  return (
    <LikeContext.Provider value={{ likeState, likeDispatch }}>
      {children}
    </LikeContext.Provider>
  );
};

const useLike = () => {
  return useContext(LikeContext);
};

export { LikeProvider, useLike };
