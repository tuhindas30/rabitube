import "./assets/css/global.css";
import { Route, Routes } from "react-router";
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
import History from "./pages/History/History";
import WrapperWithSearch from "./layouts/WrapperWithSearch";
import Wrapper from "./layouts/Wrapper";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WrapperWithSearch />} />
      <Route path="/categories/:id" element={<WrapperWithSearch />} />
      <Route
        path="/video/:videoId"
        element={<Wrapper children={<Video />} />}
      />
      <Route path="/signin" element={<Wrapper children={<SignIn />} />} />
      <Route path="/signup" element={<Wrapper children={<SignUp />} />} />
      <PrivateRoute path="/user" element={<Wrapper children={<User />} />} />
      <PrivateRoute
        path="/watchlater"
        element={<Wrapper children={<Watchlater />} />}
      />
      <PrivateRoute path="/liked" element={<Wrapper children={<Liked />} />} />
      <PrivateRoute
        path="/playlists"
        element={<Wrapper children={<PlayLists />} />}
      />
      <PrivateRoute
        path="/playlists/:playlistId"
        element={<Wrapper children={<PlayListedVideos />} />}
      />
      <PrivateRoute
        path="/history"
        element={<Wrapper children={<History />} />}
      />
      <PrivateRoute
        path="/library"
        element={<Wrapper children={<Library />} />}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default App;
