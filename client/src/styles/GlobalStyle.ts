import { createGlobalStyle } from "styled-components";
import ResetStyle from "styled-reset";

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
        margin-top: 60px;
    }
`;
