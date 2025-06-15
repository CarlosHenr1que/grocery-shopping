import { createGlobalStyle } from 'styled-components';
import interRegular from '../../assets/fonts/Inter/Inter-Regular.ttf';
import interBold from '../../assets/fonts/Inter/Inter-Bold.ttf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter-Regular';
    src: url(${interRegular}) format('truetype');
  }

  @font-face {
    font-family: 'Inter-Bold';
    src: url(${interBold}) format('truetype');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
  }

  body {
    background: #F3F6F5;
    color: #064C4F;
    font-family: 'Inter-Regular', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Inter-Regular', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`;
