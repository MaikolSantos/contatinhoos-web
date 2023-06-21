import React from "react";
import { Container } from "./styles";
import { createPortal } from "react-dom";
import { useOutClick } from "../../hooks/useOutClick";

interface ModalProps {
  children: React.ReactNode;
  toggleOpenModal: () => void;
}

export const Modal = ({ toggleOpenModal, children }: ModalProps) => {
  const ref = useOutClick(toggleOpenModal);

  return createPortal(
    <Container>
      <div ref={ref}>{children}</div>
    </Container>,

    document.body
  );
};
