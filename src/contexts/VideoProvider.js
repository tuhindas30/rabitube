import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../api/helper";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const videoUrl = `${BASE_URL}/videos`;
  const categoryUrl = `${BASE_URL}/categories`;

  const getFromServer = async (url) => {
    const response = await axios.get(url);
    return response;
  };

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getFromServer(videoUrl);
        if (data.status === "SUCCESS") {
          setVideos(data.videos);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [videoUrl]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getFromServer(categoryUrl);
        if (data.status === "SUCCESS") {
          setCategories(data.categories);
        }
      })();
    } catch (err) {
      console.log(err);
    }
  }, [categoryUrl]);

  return (
    <VideoContext.Provider value={{ videos, categories }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
