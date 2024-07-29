// src/components/SkeletonLoader.js
import React from 'react';
import styled from 'styled-components';

const SkeletonContainer = styled.div`
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    height: 11px;
    width: 31%;
    animation: pulse 1.5s infinite ease-in-out;
    margin: 0px;

  @keyframes pulse {
    0% {
      background-color: rgba(255, 255, 255, 0.2);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.5);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const SkeletonLoader = () => {
  return <SkeletonContainer />;
};

export default SkeletonLoader;
