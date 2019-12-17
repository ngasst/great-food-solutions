import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import { Modal } from './modal';

const StyledAlert = styled(Alert)`
  margin-right: 2rem;
`;

export const PopUp = () => {
  const [flash, setFlash] = useState('');
  const messageAuth = useSelector(state => state.auth.msg);

  useEffect(() => {
    if (messageAuth) {
      setFlash(messageAuth);
    }
    handleClose();
  }, [messageAuth]);

  const handleClose = () => {
    setTimeout(function() {
      setFlash('');
    }, 100000);
  };

  return (
    <Modal>
      <StyledAlert id="alert" variant="primary" show={flash !== ''}>
        {flash}
      </StyledAlert>
    </Modal>
  );
};
