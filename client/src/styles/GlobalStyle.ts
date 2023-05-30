import { createGlobalStyle } from "styled-components";
import ResetStyle from "styled-reset";
import Cafe24Surroundair from "@assets/fonts/Cafe24Surroundair.ttf";
import Cafe24Anemone from "@assets/fonts/Cafe24Anemone.ttf";
import WanjuRegular from "@assets/fonts/WanjuRegular.ttf";
import WanjuBold from "@assets/fonts/WanjuBold.ttf";

export default createGlobalStyle`
    ${ResetStyle} // input button textarea a link 등등의 스타일 초기화

    *{
        box-sizing: border-box;
        font-family: -apple-system, "system-ui", Segoe UI, BlinkMacSystemFont
        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
    }
    body {
        background: #F7F7F7;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    main { 
        width: 100%; 
    }
    .main {
        margin-top: 120px;

        @media screen and (max-width: 767px) {
            margin-top: 50px;
        }
    }

    @font-face {
        font-family: 'Cafe24Surroundair';
        src: local('Cafe24Surroundair'), local('Cafe24Surroundair');
        font-style: normal;
        src: url(${Cafe24Surroundair}) format('truetype');
    }

    @font-face {
        font-family: 'Cafe24Anemone';
        src: local('Cafe24Anemone'), local('Cafe24Anemone');
        font-style: normal;
        src: url(${Cafe24Anemone}) format('truetype');
    }

    @font-face {
        font-family: 'WanjuRegular';
        src: local('WanjuRegular'), local('WanjuRegular');
        font-style: normal;
        src: url(${WanjuRegular}) format('truetype');
    }

    @font-face {
        font-family: 'WanjuBold';
        src: local('WanjuBold'), local('WanjuBold');
        font-style: normal;
        src: url(${WanjuBold}) format('truetype');
    }

`;
