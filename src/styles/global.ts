import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html,
  canvas,
  body,
  #react-container,
  #routeContainer {
    font-family: Helvetica, Arial, sans-serif;
    height: 100%;
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;
