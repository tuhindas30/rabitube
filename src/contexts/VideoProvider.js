import { createContext, useContext, useEffect, useState } from "react";
import * as videoApi from "../api/video";
import * as categoryApi from "../api/category";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [isVideosLoading, setVideosLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setVideosLoading(true);
        const { data } = await videoApi.getAllVideos();
        setVideos(data);
      } catch (err) {
        setVideos([]);
      } finally {
        setVideosLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setVideosLoading(true);
        const { data } = await categoryApi.getAllCategories();
        setCategories(data);
      } catch (err) {
        setCategories([]);
      } finally {
        setVideosLoading(false);
      }
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ isVideosLoading, videos, categories }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
