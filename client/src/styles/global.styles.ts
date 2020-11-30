import { createGlobalStyle, css } from 'styled-components';

export default createGlobalStyle`
    *,
    *::before,
    *::after{
        margin:0;
        padding:0;
        box-sizing:inherit;
    }
    
    html{
        box-sizing:border-box;
        height:100%;
        width:100%;
        font-size:10px;
    }
    
    #__next,
    body{
        width:100%;
        height:100%;
    }

    body{
        font-weight:normal;
        ${({ theme }) => css`
          background-color: ${theme.colors.bg};
          line-height: ${theme.lineHeight};
          font-size: ${theme.fontSizeBase}px;
          color: ${theme.colors.text.main};
          font-weight: ${theme.fontWeights[0]};
          font-family: ${theme.fontFamily};
        `};
    }

    a{
        text-decoration:none;
    }

    h1,h2,h3,h4,h5,h6{
        font-weight:normal;
        margin:0;
    }

`;
