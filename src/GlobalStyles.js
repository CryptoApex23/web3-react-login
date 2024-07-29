// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif; /* Apply the Montserrat font */
    background-color: #121212; /* Dark background */
    color: #e0e0e0; /* Light text */
  }
`;

export default GlobalStyle;
