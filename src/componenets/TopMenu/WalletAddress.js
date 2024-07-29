import React from 'react';
import styled from 'styled-components';
import EthereumIcon from './EthIcon';
import DropdownMenu from './DropdownMenu';

const WalletAddressContainer = styled.div`
  background-color: #444;
  color: #ff6600; /* Orange hint */
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-right: 1rem;
`;

const WalletAddress = ({ address, menuVisible, setMenuVisible, ethBalance, handleDisconnect }) => {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <WalletAddressContainer onClick={() => setMenuVisible(!menuVisible)}>
      <EthereumIcon />
      {shortAddress}
      {menuVisible && (
        <DropdownMenu
          show={menuVisible}
          ethBalance={ethBalance}
          handleDisconnect={handleDisconnect}
        />
      )}
    </WalletAddressContainer>
  );
};

export default WalletAddress;
