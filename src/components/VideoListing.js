import videosDB from "../videosDB";
import "../assests/css/videolisting.css";
import VideoListItem from "./VideoListItem";
const VideoListing = () => {
  return (
    <div className="video-list">
      {videosDB.map(({ id, avatar, title, views, channel, postedOn }) => (
        <VideoListItem
          key={id}
          id={id}
          avatar={avatar}
          title={title}
          views={views}
          channel={channel}
          postedOn={postedOn}
        />
      ))}
    </div>
  );
};
export default VideoListing;
