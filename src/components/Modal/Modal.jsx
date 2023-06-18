import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBlock, ModalWrapper } from './Modal.styled';

const modalRoot = document.querySelector('#modal');

export const Modal = ({ modalHide, children }) => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      modalHide();
    }
  };

  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      modalHide();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <ModalWrapper onClick={handleBackDrop}>
      <ModalBlock>{children}</ModalBlock>
    </ModalWrapper>,
    modalRoot
  );
};
