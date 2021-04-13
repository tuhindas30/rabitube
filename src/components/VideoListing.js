import videosDB from "../videosDB";
import VideoListItem from "./VideoListItem";
const VideoListing = () => {
  return (
    <>
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
    </>
  );
};
export default VideoListing;
