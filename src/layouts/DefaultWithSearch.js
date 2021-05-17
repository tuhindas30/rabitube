import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

const DefaultWithSearch = ({ children }) => {
  return (
    <>
      <Navbar search={true} />
      <SideBar />
      <ToastContainer />
      {children}
      <Footer />
    </>
  );
};

export default DefaultWithSearch;
