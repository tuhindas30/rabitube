import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import Searchbar from "../components/Searchbar/Searchbar";
import Categorybar from "../components/Categorybar/Categorybar";
import Home from "../pages/Home/Home";

const WrapperWithSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <Navbar
        search={true}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <Searchbar setSearchInput={setSearchInput} />
      <Categorybar />
      <SideBar />
      <ToastContainer />
      <Home searchInput={searchInput} />
      <Footer />
    </>
  );
};

export default WrapperWithSearch;
