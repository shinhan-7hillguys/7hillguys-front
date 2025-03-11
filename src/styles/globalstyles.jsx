import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '../font/pretendard.css';

export const GlobalStyle = createGlobalStyle`
  ${reset}
   * {
    box-sizing: border-box;
  }
  body {
     font-family: 'Pretendard', sans-serif;
    background-color: #fdfdfd;
    margin: 0;
    padding: 0;
    overflow-x: hidden;  
    box-sizing: border-box;
    color: #333;
  }
  breadcrumbMaintitle { 
    display: flex;
    font-size: 32px;
    font-weight: bold;
    padding-bottom : 30px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
