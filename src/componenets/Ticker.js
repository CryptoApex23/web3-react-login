import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWebSocket } from '../context/WebSocketContext';
import { faBitcoin, faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SkeletonLoader from './SkeletonLoader';

const TickerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 900px; /* Set maximum width */
  margin: 0 auto; /* Center the container */
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;

  }
`;

const TickerItem = styled.div`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    width: 80%;
    margin: 10px 0;

  }
  gap:25px;
`;

const TickerTitle = styled.h4`
  margin: 0;
  color: #ff6600; /* Orange hint */
`;

const TickerPrice = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #fff;
`;

const TickerIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
`;

const Ticker = () => {
  const { messages } = useWebSocket();
  const [prices, setPrices] = useState({ btc: 0, eth: 0, sol: 0 });

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      const { data } = latestMessage;
      if (data && data.symbol === 'BTCUSDT') {
        setPrices((prevPrices) => ({ ...prevPrices, btc:parseFloat(data.usdIndexPrice).toFixed(2)  }));
      }
      if (data && data.symbol === 'ETHUSDT') {
        setPrices((prevPrices) => ({ ...prevPrices, eth:parseFloat(data.usdIndexPrice).toFixed(2)}));
      }
    }
  }, [messages]);

  return (
    <TickerContainer>
      <TickerItem>
        <TickerTitle>
          <TickerIcon icon={faBitcoin} size="lg" />
          BTC
        </TickerTitle>
        {prices.btc === 0 ? <SkeletonLoader /> : <TickerPrice>$ {prices.btc}</TickerPrice>}
      </TickerItem>
      <TickerItem>
        <TickerTitle>
          <TickerIcon icon={faEthereum} size="lg" />
        ETH
        </TickerTitle>
        {prices.eth === 0 ? <SkeletonLoader /> : <TickerPrice>$ {prices.eth}</TickerPrice>}
      </TickerItem>
    </TickerContainer>
  );
};

export default Ticker;
