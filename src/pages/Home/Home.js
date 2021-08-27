import { useParams } from "react-router";
import { useModal } from "../../contexts/ModalProvider";
import { useVideo } from "../../contexts/VideoProvider";
import getSearchVideos from "../../utils/getSearchVideos";
import styles from "./Home.module.css";
import VideoCard from "../../components/VideoCard/VideoCard";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";

const Home = ({ searchInput }) => {
  const { videos } = useVideo();
  const { isModalVisible, toggleModalVisibility, setModalData } = useModal();
  const { id } = useParams();

  const filterCategory = (videoArray, categoryId) => {
    if (categoryId !== undefined) {
      return videoArray.filter(({ category }) => category._id === id);
    }
    return videos;
  };
  const filteredCategory = filterCategory(videos, id);
  const searchedVideos = getSearchVideos(filteredCategory, searchInput);

  const handleOptionClick = (videoId) => {
    setModalData(videoId);
    toggleModalVisibility();
  };

  if (videos.length === 0) {
    return (
      <div className="overlay">
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.listVideo}>
      {isModalVisible && (
        <Modal handleClose={toggleModalVisibility}>
          <ModalForm formType="SAVE_VIDEO" />
        </Modal>
      )}
      {searchedVideos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          onOptionClick={handleOptionClick}
        />
      ))}
    </div>
  );
};

export default Home;
