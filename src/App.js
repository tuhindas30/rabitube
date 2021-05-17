import "./assests/css/global.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Library from "./pages/Library/Library";
import Liked from "./pages/Liked/Liked";
import PlayListedVideos from "./pages/PlaylistedVideos/PlayListedVideos";
import PlayLists from "./pages/Playlists/PlayLists";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video/Video";
import Watchlater from "./pages/Watchlater/Watchlater";
import Error404 from "./pages/Error404/Error404";
import PrivateRoute from "./routes/PrivateRoute";
import SignUp from "./pages/SignUp";
import User from "./pages/User";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories/:id" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <PrivateRoute path="/user" element={<User />} />
      <PrivateRoute path="/liked" element={<Liked />} />
      <PrivateRoute path="/watch-later" element={<Watchlater />} />
      <PrivateRoute path="/playlists" element={<PlayLists />} />
      <PrivateRoute path="/playlists/:pId" element={<PlayListedVideos />} />
      <PrivateRoute path="/library" element={<Library />} />
      <Route path="/video/:vId" element={<Video />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default App;
