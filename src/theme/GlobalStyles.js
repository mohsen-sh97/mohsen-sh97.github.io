import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background} !important;
    background-color: ${({ theme }) => theme.background} !important;
    color: ${({ theme }) => theme.color} !important;
    transition: background 0.50s linear, background-color 0.50s linear, color 0.50s linear;
  }
`;

export default GlobalStyles;
