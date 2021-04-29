import { Route, Routes } from "react-router";
import "./assests/css/global.css";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import PlayLists from "./pages/PlayLists";
import Library from "./pages/Library";
import Video from "./pages/Video";
import Footer from "./components/Footer";
import NavBar from ".//components/NavBar";
import Liked from "./pages/Liked";
import Error404 from "./pages/Error404";
import PlayListedVideo from "./pages/PlayListedVideos";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:name" element={<Home />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/playlists" element={<PlayLists />} />
        <Route path="/playlists/:p_id" element={<PlayListedVideo />} />
        <Route path="/library" element={<Library />} />
        <Route path="/video/:v_id" element={<Video />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
