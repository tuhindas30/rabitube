import { useParams } from "react-router";
import styles from "./Video.module.css";
import generateVideoLink from "../../utils/generateVideoLink";
import SaveVideoModal from "../../components/SaveVideoModal/SaveVideoModal";
import { useModal } from "../../contexts/ModalProvider";
import { useAuth } from "../../contexts/AuthProvider";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import { useVideo } from "../../contexts/VideoProvider";
import axios from "axios";
import { BASE_URL } from "../../api/helper";
import showToast from "../../utils/showToast";

const Video = () => {
  const { vId } = useParams();
  const { videos } = useVideo();
  const video = videos && videos.find((item) => item._id === vId);
  const { isModalVisible, setModalVisibility } = useModal();
  const { isUserLoggedIn, userState, userDispatch } = useAuth();

  const isVideoPresent = userState.liked?.some((item) => item._id === vId);

  const handleLikeBtn = async () => {
    if (userState.liked.some((video) => video._id === vId)) {
      showToast("Removing from Liked videos ...");
      try {
        const { data } = await axios.delete(
          `${BASE_URL}/users/${userState._id}/liked/${vId}`
        );
        if (data.status === "SUCCESS") {
          userDispatch({ type: "REMOVE_FROM_LIKED", payload: { vId } });
          showToast("Removed from Liked videos");
        }
      } catch (err) {
        console.log(err);
        showToast("Something went wrong. Please try again");
      }
    } else {
      showToast("Adding to Liked videos ...");
      try {
        const { data } = await axios.post(
          `${BASE_URL}/users/${userState._id}/liked`,
          {
            id: vId,
          }
        );
        if (data.status === "SUCCESS") {
          userDispatch({
            type: "ADD_TO_LIKED",
            payload: { _id: vId, title: video.title, channel: video.channel },
          });
          showToast("Added to Liked videos");
        }
      } catch (err) {
        console.log(err);
        showToast("Something went wrong. Please try again");
      }
    }
  };

  const handleSaveBtn = () => {
    setModalVisibility("show");
  };

  return (
    <>
      <DefaultWithoutSearch>
        <div className={styles.video}>
          {isModalVisible === "show" && (
            <SaveVideoModal
              vId={vId}
              title={video?.title}
              channel={video?.channel}
            />
          )}
          <div className={styles.videoContainer}>
            <iframe
              src={generateVideoLink(vId)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
          <div className={styles.videoDetails}>
            <small>#{video?.category.title}</small>
            <p className={styles.titleLarge}>{video?.title}</p>
            <small>{video?.views} views</small>
            <div className={styles.savebar}>
              <div
                onClick={isUserLoggedIn && handleLikeBtn}
                className={styles.savebarItem}>
                <i
                  className="bi bi-hand-thumbs-up-fill icon__large"
                  style={{
                    color: isVideoPresent ? "var(--rb-primary)" : "black",
                  }}></i>
                <p>
                  <small>Like</small>
                </p>
              </div>
              <div
                onClick={isUserLoggedIn && handleSaveBtn}
                className={styles.savebarItem}>
                <i className="bi bi-save2 icon__large"></i>
                <p>
                  <small>Save</small>
                </p>
              </div>
            </div>
            <div className={styles.channelDescription}>
              <div className="avatar">
                <img className="image round" src={video?.avatar} alt="avatar" />
              </div>
              <div className={styles.title}>
                <p>{video?.channel}</p>
                <small>{video?.subscriber} subcribers</small>
              </div>
            </div>
            <div className={styles.description}>
              <p>Published on {video?.postedOn}</p>
              {video?.description}
            </div>
          </div>
        </div>
      </DefaultWithoutSearch>
    </>
  );
};
export default Video;
