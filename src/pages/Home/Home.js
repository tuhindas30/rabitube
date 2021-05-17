import Categorybar from "../../components/Categorybar/Categorybar";
import getSearchVideos from "../../utils/getSearchVideos";
import styles from "./Home.module.css";
import { useParams } from "react-router";
import DefaultWithSearch from "../../layouts/DefaultWithSearch";
import { useState } from "react";
import { useModal } from "../../contexts/ModalProvider";
import { useSearch } from "../../contexts/SearchProvider";
import { useVideo } from "../../contexts/VideoProvider";
import SaveVideoModal from "../../components/SaveVideoModal/SaveVideoModal";
import VideoCard from "../../components/VideoCard/VideoCard";

const Home = () => {
  const [modalData, setModalData] = useState({
    vId: "",
    title: "",
    duration: "",
    channel: "",
  });
  const { videos } = useVideo();
  const { isModalVisible, setModalVisibility } = useModal();
  const { searchInput } = useSearch();
  const { id } = useParams();

  const filterCategory = (videoArray, categoryId) => {
    if (categoryId !== undefined) {
      return videoArray.filter(({ category }) => category._id === id);
    }
    return videos;
  };
  const filteredCategory = filterCategory(videos, id);
  const searchedVideos = getSearchVideos(filteredCategory, searchInput);

  const handleOptionClick = (videoObj) => {
    setModalData(videoObj);
    setModalVisibility("show");
  };

  if (videos.length > 0) {
    return (
      <>
        <DefaultWithSearch>
          <div className={styles.videoPage}>
            <Categorybar />
            <div className={styles.listVideo}>
              {isModalVisible === "show" && <SaveVideoModal {...modalData} />}
              {searchedVideos.map(
                ({
                  _id,
                  avatar,
                  title,
                  duration,
                  views,
                  channel,
                  postedOn,
                }) => (
                  <VideoCard
                    key={_id}
                    vId={_id}
                    avatar={avatar}
                    title={title}
                    duration={duration}
                    views={views}
                    channel={channel}
                    postedOn={postedOn}
                    onOptionClick={handleOptionClick}
                  />
                )
              )}
            </div>
          </div>
        </DefaultWithSearch>
      </>
    );
  }
  return (
    <DefaultWithSearch>
      <h1 className="overlay">Loading ...</h1>
    </DefaultWithSearch>
  );
};
export default Home;
