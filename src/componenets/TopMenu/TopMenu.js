import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Web3 from 'web3';
import WalletAddress from './WalletAddress';
import { clearAddress, setAddress, setEthBalance } from '../../redux/userSlice';

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
  position: relative;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const WalletContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ConnectButton = styled.button`
  background-color: #444;
  color: #ff6600; /* Orange hint */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  position: relative;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  outline: none;
  
  &:hover {
    background-color: #555;
  }
`;

const TopMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const address = useSelector(state => state.user.address);
  const ethBalance = useSelector(state => state.user.ethBalance);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_INFURA_NETWORK);
          const balance = await web3.eth.getBalance(address);
          dispatch(setEthBalance(web3.utils.fromWei(balance, 'ether')));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [address, dispatch]);

  const handleDisconnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
        dispatch(clearAddress());
      } catch (error) {
        console.error('Error disconnecting from wallet:', error);
      }
    }
    setMenuVisible(false);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          dispatch(setAddress(accounts[0]));
        }
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    }
  };

  return (
    <Navbar>
      <Logo>MyApp</Logo>
      <WalletContainer>
        {address ? (
          <WalletAddress
            address={address}
            menuVisible={menuVisible}
            setMenuVisible={setMenuVisible}
            ethBalance={ethBalance}
            handleDisconnect={handleDisconnect}
          />
        ) : (
          <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
        )}
      </WalletContainer>
    </Navbar>
  );
};

export default TopMenu;
