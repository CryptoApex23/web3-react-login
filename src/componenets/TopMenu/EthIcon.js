import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons'; // Import the Ethereum icon

const EthereumIconStyled = styled(FontAwesomeIcon)`
  color: #ff6600; /* Orange hint */
  font-size: 1.2rem;
  margin-right: 0.5rem;
  animation: glow 1.5s infinite alternate;
  
  @keyframes glow {
    from {
      text-shadow: 0 0 5px #ff6600;
    }
    to {
      text-shadow: 0 0 20px #ff6600, 0 0 30px #ff6600;
    }
  }
`;

const EthereumIcon = () => <EthereumIconStyled icon={faEthereum} />;

export default EthereumIcon;
