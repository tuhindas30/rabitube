import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState("");
  const [isModalVisible, setModalVisibility] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisibility((visibility) => !visibility);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        toggleModalVisibility,
        modalData,
        setModalData,
      }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  return useContext(ModalContext);
};

export { ModalProvider, useModal };
