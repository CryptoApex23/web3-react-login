// src/App.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TopMenu from './componenets/TopMenu/TopMenu';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress ,clearAddress} from './redux/userSlice';
import Ticker from './componenets/Ticker';

const AppContainer = styled.div`
  min-height: 100vh;
`;

const theme = {
  dark: {
    background: '#121212',
    text: '#e0e0e0',
    accent: '#ff6600', // Orange hint
  },
};

const App = () => {
  const dispatch = useDispatch();
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const initWeb3 = new Web3(window.ethereum);
      setWeb3(initWeb3);

      window.ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        if (accounts.length > 0) {
          dispatch(setAddress(accounts[0]));
        }
      });

      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length > 0) {
          dispatch(setAddress(accounts[0]));
        } else {
          dispatch(clearAddress());
        }
      });
    } else {
      alert('Please install MetaMask or another Web3 wallet extension');
    }
  }, [dispatch]);



  return (
    <ThemeProvider theme={theme.dark}>
      <GlobalStyle />
      <AppContainer>
        <TopMenu />
        <div style={{ padding: '20px' }}>
        <Ticker />
        </div>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
