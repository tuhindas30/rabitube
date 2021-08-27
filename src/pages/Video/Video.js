import { useParams } from "react-router";
import { useModal } from "../../contexts/ModalProvider";
import { useAuth } from "../../contexts/AuthProvider";
import { useVideo } from "../../contexts/VideoProvider";
import { useLike } from "../../contexts/LikeProvider";
import ReactPlayer from "react-player/lazy";
import Modal from "../../components/Modal/Modal";
import ModalForm from "../../components/ModalForm/ModalForm";
import generateVideoLink from "../../utils/generateVideoLink";
import styles from "./Video.module.css";
import { AiFillLike } from "react-icons/ai";
import { RiPlayListAddFill, RiShareForwardFill } from "react-icons/ri";
import { ReactComponent as EmptyVideosSvg } from "../../assets/images/EmptyVideosImage.svg";
import { useState } from "react";
import showToast from "../../utils/showToast";
import { ReactComponent as Loader } from "../../assets/images/Loader.svg";

const Video = () => {
  const { videoId } = useParams();
  const { isVideosLoading, videos } = useVideo();
  const { isModalVisible, setModalData, toggleModalVisibility } = useModal();
  const { token } = useAuth();
  const { likeState, addToLikedPlaylist, removeFromLikedPlaylist } = useLike();
  const [type, setType] = useState("");

  const video = videos.find((item) => item._id === videoId);
  const isVideoPresent = likeState.some(({ video }) => video._id === videoId);

  const handleLike = async (videoId) => {
    if (likeState.some(({ video }) => video._id === videoId)) {
      await removeFromLikedPlaylist(videoId);
    } else {
      await addToLikedPlaylist(videoId);
    }
  };

  const handleSave = (videoId) => {
    setType("SAVE_VIDEO");
    setModalData(videoId);
    toggleModalVisibility();
  };

  const handleShare = (videoId) => {
    setType("SHARE_VIDEO");
    setModalData(videoId);
    toggleModalVisibility();
  };

  if (isVideosLoading) {
    return (
      <div className="overlay">
        <Loader />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className={styles.noVideosFound}>
        <EmptyVideosSvg width="80%" />
        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "1rem 2rem",
          }}>
          No videos found! Try refreshing the page :)
        </p>
      </div>
    );
  }
  return (
    <div className={styles.video}>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          url={generateVideoLink(videoId)}
          width="100%"
          height="100%"
          className={styles.reactPlayer}
          playing={true}
          controls={true}
          pip={true}
          stopOnUnmount={false}
        />
      </div>
      <div className={styles.videoDetails}>
        <div style={{ fontSize: "0.9rem" }}>#{video.category.title}</div>
        <div style={{ fontSize: "1.2rem" }}>{video.title}</div>
        <div>{video.viewCount} views</div>
        <div className={styles.savebar}>
          <div
            onClick={() =>
              token
                ? handleLike(videoId)
                : showToast("Sign-in to Like this video")
            }
            className={`flex-icon ${styles.savebarItem}`}>
            <AiFillLike
              className="icon__large"
              style={{
                color: isVideoPresent ? "var(--rb-primary)" : "var(--rb-black)",
              }}
            />
            <div style={{ fontSize: "0.9rem" }}>Like</div>
          </div>
          <div
            onClick={() =>
              token
                ? handleSave(videoId)
                : showToast("Sign-in to save this video")
            }
            className={`flex-icon ${styles.savebarItem}`}>
            <RiPlayListAddFill className="icon__large" />
            <div style={{ fontSize: "0.9rem" }}>Save</div>
          </div>
          <div
            onClick={() => handleShare(videoId)}
            className={`flex-icon ${styles.savebarItem}`}>
            <RiShareForwardFill className="icon__large" />
            <div style={{ fontSize: "0.9rem" }}>Share</div>
          </div>
        </div>
        <div className={styles.channelDescription}>
          <img
            className="image round"
            src={video.avatarUrl}
            alt="channel avatar"
          />
          <div style={{ marginLeft: "1rem" }}>
            <div>{video.channelName}</div>
            <div style={{ fontSize: "0.9rem" }}>
              {video.subscriberCount} subcribers
            </div>
          </div>
        </div>
        <div className={styles.description}>
          <div>Published on {video.uploadDate}</div>
          {video.description}
        </div>
      </div>
      {isModalVisible && (
        <Modal handleClose={toggleModalVisibility}>
          <ModalForm formType={type} />
        </Modal>
      )}
    </div>
  );
};
export default Video;
