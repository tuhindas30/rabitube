import { useParams } from "react-router";
import { useModal } from "../../contexts/ModalProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { useVideo } from "../../contexts/VideoProvider";
import { useLike } from "../../hooks/useLike";
import styles from "./Video.module.css";
import generateVideoLink from "../../utils/generateVideoLink";
import SaveVideoModal from "../../components/SaveVideoModal/SaveVideoModal";
import DefaultWithoutSearch from "../../layouts/DefaultWithoutSearch";
import showToast from "../../utils/showToast";

const Video = () => {
  const { vId } = useParams();
  const { videos } = useVideo();
  const { isModalVisible, setModalVisibility } = useModal();
  const { userState, userDispatch, auth } = useAuth();
  const { addToLike, removeFromLike } = useLike(userDispatch);

  const video = videos && videos.find((item) => item._id === vId);
  const isVideoPresent = userState.liked?.some((item) => item._id === vId);

  const handleLikeBtn = async () => {
    if (auth.isUserLoggedIn) {
      if (userState.liked.some((video) => video._id === vId)) {
        showToast("Removing video from liked playlist ...");
        try {
          await removeFromLike(vId);
          showToast("Video removed from liked playlist");
        } catch (err) {
          console.log(err);
          showToast("Something went wrong. Please try again");
        }
      } else {
        showToast("Adding video to liked playlist ...");
        try {
          await addToLike(vId, video.title, video.channel);
          showToast("Video added to liked playlist");
        } catch (err) {
          console.log(err);
          showToast("Something went wrong. Please try again");
        }
      }
    } else {
      alert("You must be logged in to like this video");
    }
  };

  const handleSaveBtn = () => {
    auth.isUserLoggedIn
      ? setModalVisibility("show")
      : alert("You must be logged in to add video to playlist");
  };

  if (videos.length <= 0) {
    return (
      <DefaultWithoutSearch>
        <h1 className="overlay">Loading ...</h1>
      </DefaultWithoutSearch>
    );
  }
  return (
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
            <div onClick={handleLikeBtn} className={styles.savebarItem}>
              <i
                className="bi bi-hand-thumbs-up-fill icon__large"
                style={{
                  color: isVideoPresent ? "var(--rb-primary)" : "black",
                }}></i>
              <p>
                <small>Like</small>
              </p>
            </div>
            <div onClick={handleSaveBtn} className={styles.savebarItem}>
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
  );
};
export default Video;
