import {createGlobalStyle} from "styled-components"


export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
  }

  :root {
    --color-primary: #27AE60;
    --color-primary-50: #93D7AF;
    --color-secondary: #EB5757;
    --color-black: #000000;
    --color-grey-100: #333333;
    --color-grey-50: #828282;
    --color-grey-20: #E0E0E0;
    --color-grey-0: #F5F5F5;
    --color-white: #FFFFFF;
    --color-negative: #E60000;
    --color-warning: #FFCD07;
    --color-success: #168821;
    --color-information: #155BCB;

    --radius-1: .25rem;
    --radius-2: 0.5rem;
    
    font-size: 60%;
  }

  @media screen {
   :root {
    font-size: 62.5%;
   } 
  }

  body {
    padding: 0 1rem;
  }

  ::-webkit-scrollbar {
    background-color: transparent;
    height: 0.25rem;
    width: 0.25rem;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-primary);
    border-radius: var(--radius-2);
    cursor: pointer;
  }
`