import CategoryBar from "../components/CategoryBar";
import VideoListing from "../components/VideoListing";
import "../assests/css/home.css";
import { useParams } from "react-router";
const Home = () => {
  const { name } = useParams();

  return (
    <>
      <div className="video-pages">
        <CategoryBar />
        <VideoListing category={name} />
      </div>
    </>
  );
};
export default Home;
