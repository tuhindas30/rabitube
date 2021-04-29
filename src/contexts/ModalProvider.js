import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalVisible, setModalVisibility] = useState("hide");
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState("hide");

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        setModalVisibility,
        isDeleteModalVisible,
        setDeleteModalVisibility,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  return useContext(ModalContext);
};

export { ModalProvider, useModal };
