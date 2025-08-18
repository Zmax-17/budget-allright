import { createContext, useContext, useState } from "react";

const ModalContext = createContext();
function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    isOpen: false,
    name: null,
    data: null,
  });
  const openModal = (name, data = {}) => {
    setModal({ isOpen: true, name, data });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      name: null,
      data: null,
    });
  };
  return (
    <ModalContext.Provider
      value={{ ...modal, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
export default ModalProvider;
