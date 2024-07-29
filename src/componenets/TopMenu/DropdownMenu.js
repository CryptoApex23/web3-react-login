import React from 'react';
import styled from 'styled-components';

const DropdownMenuContainer = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  z-index: 10;
`;

const MenuItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const DropdownMenu = ({ show, ethBalance, handleDisconnect }) => (
  <DropdownMenuContainer show={show}>
    <MenuItem>ETH Balance: {ethBalance} ETH</MenuItem>
    <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
  </DropdownMenuContainer>
);

export default DropdownMenu;
