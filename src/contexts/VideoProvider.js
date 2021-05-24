import { createContext, useContext, useEffect, useState } from "react";
import * as videoApi from "../api/video";
import * as categoryApi from "../api/category";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const data = await videoApi.getAllVideos();
        if (data.status === "SUCCESS") {
          setVideos(data.videos);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const data = await categoryApi.getAllCategories();
        if (data.status === "SUCCESS") {
          setCategories(data.categories);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <VideoContext.Provider value={{ videos, categories }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
