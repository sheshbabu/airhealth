import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Lato-Regular';
    src: url('/fonts/Lato-Regular.ttf');
  }

  @font-face {
    font-family: 'Lato-Semibold';
    src: url('/fonts/Lato-Semibold.ttf');
  }

  * {
    font-family: Lato-Regular, sans-serif;
    color: #333;
  }

  body {
    background: #f6f6f6;
  }

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
