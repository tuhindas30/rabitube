import { createContext, useContext, useEffect, useState } from "react";
import { setupCancelToken } from "../utils/helper";
import * as videoApi from "../api/video";
import * as categoryApi from "../api/category";
import axios from "axios";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [isVideosLoading, setVideosLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  const source = axios.CancelToken.source();
  setupCancelToken(source);

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
    return () => source.cancel("products unmounted");
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
    return () => source.cancel("products unmounted");
  }, []);

  return (
    <VideoContext.Provider value={{ isVideosLoading, videos, categories }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
