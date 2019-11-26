import App from "next/app";
import React from "react";
import { Normalize } from "styled-normalize";
import { GlobalStyle } from "./styles";

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
