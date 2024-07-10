"use client";

import { StudioProvider } from "@/lib/contexts/StudioContext";
import { ReactNode, createContext, useContext, useState } from "react";
import Modal from ".";

interface ModalContextProps {
  show: (content: ReactNode) => void;
  hide: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function StudioModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [showModal, setShowModal] = useState(false);

  const show = (content: ReactNode) => {
    setModalContent(content);
    setShowModal(true);
  };

  const hide = () => {
    setShowModal(false);
    setTimeout(() => {
      setModalContent(null);
    }, 300); // Adjust this timeout as per your transition duration
  };

  return (
    <StudioProvider>
      <ModalContext.Provider value={{ show, hide }}>
        {children}
        {showModal && (
          <Modal showModal={showModal} setShowModal={setShowModal}>
            {modalContent}
          </Modal>
        )}
      </ModalContext.Provider>
    </StudioProvider>
  );
}

export function useStudioModal() {
  return useContext(ModalContext);
}
