import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1031;
`;
export function Modal({ children }) {
  return ReactDOM.createPortal(
    <Wrapper>{children}</Wrapper>,
    document.getElementById('popup-portal')
  );
}
