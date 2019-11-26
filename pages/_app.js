import App from "next/app";
import React from "react";
import { Normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Normalize />
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  }
}
