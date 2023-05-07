import { createGlobalStyle } from "styled-components";
import ResetStyle from "styled-reset";

export default createGlobalStyle`
    ${ResetStyle} // input button textarea a link 등등의 스타일 초기화
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 10px;
        vertical-align: baseline;
    }
    main{
        margin-left: 95px;
        margin-right: 95px;
        height: 100vh;
        max-width: 1250px;
    }
    *{
        box-sizing: border-box;
        font-family: 'Courier New', Courier, monospace; //IBM
    }
    button{
        display: flex;
        border-radius: 7px;
        cursor: pointer;
        outline: none;
        border: none;
    }
    input{
        display: flex;
        outline: none;
        border: none;
        background-color: inherit;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
`;
