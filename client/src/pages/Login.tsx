import styled, { ThemeContext } from "styled-components";
import { useContext, useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonDark } from "../components/Common/Button";
import { ReactComponent as Logo } from "../assets/images/Logo.svg";
import Maintop from "../assets/images/login-bg.png";
import { Icon } from "../types/Interfaces";

const url = "https://25ff-124-111-225-247.ngrok-free.app/";

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.common.flexCenterCol};
`;
const Back = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${Maintop});
  background-size: cover;
  position: absolute;
  width: inherit;
  z-index: -1;
  filter: blur(5px);
`;

const MainLogo = styled(Logo)`
  width: 150px;
  margin-bottom: 25px;
`;

const LoginContainer = styled.section`
  width: 500px;
  ${({ theme }) => theme.common.flexCenterCol};
`;

const BottomContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 20px 30px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  .input-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 15px;
  }
  .oauth-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    grid-column-gap: 50px;
  }
  .go-sign {
    color: ${({ theme }) => theme.colors.themeColor};
    float: right;
    margin-top: 20px;
    text-decoration: underline;
    cursor: pointer;
  }
  .oauth-content {
    ${({ theme }) => theme.common.flexCenterCol};
    gap: 10px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.fontColor};
    cursor: pointer;
  }
  .oauth-btn {
    ${({ theme }) => theme.common.flexCenterCol};
    padding: 15px;
    border: 1px solid #b7b7b7;
    border-radius: 50%;
  }
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.themeColor};
  height: 70px;
  width: 100%;
  padding: 0px;
  font-weight: 400;
  .title {
    font-size: 20px;
  }
  .input {
    height: 45px;
    font-size: 16px;
    background-color: inherit;
    border: 1px solid #b7b7b7;
    padding: 10px 15px;
    border-radius: 5px;
  }
`;

const OAuthButton = styled.button<Icon>`
  background-image: url(${({ icon }) => icon});
  background-size: cover;
  width: 30px;
  height: 30px;
  border: none;
  background-color: inherit;
`;

const Login = () => {
  const themeContext = useContext(ThemeContext).colors; // useContext를 통해 전역적으로 context 현재 값을 반환하는데 여기서는 ThemeProvider의 value 의 colors만 선택
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = () => {
    const body = {
      username,
      password,
    };
    console.log(body);
    axios
      .post(`${url}auth/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        localStorage.setItem("authToken", res.headers.authorization);
        navigate("/");
      })
      .catch((err) => console.log("실패", err));
  };
  const googleOAuthHandler = () => {
    //오어스 인증링크로 이동
    window.location.assign(`${url}oauth2/authorization/google`);
  };
  const facebookOAuthHandler = () => {
    //오어스 인증링크로 이동
    window.location.assign(`${url}oauth2/authorization/facebook`);
  };
  const GotoSign = () => {
    navigate("/signup");
  };
  return (
    <Container>
      <Back />
      <LoginContainer>
        <BottomContainer>
          <MainLogo></MainLogo>
          <div className="input-container">
            <InputContainer>
              <div className="title">E-mail</div>
              <input placeholder="인증 이메일" autoComplete="on" onChange={emailHandler} className="input"></input>
            </InputContainer>
            <InputContainer>
              <div className="title">Password</div>
              <input
                placeholder="비밀번호"
                autoComplete="off"
                onChange={passwordHandler}
                type="password"
                className="input"
              ></input>
            </InputContainer>
            <ButtonDark width="100%" height="45px" fontSize="18px" borderRadious="7px" onClick={handleLogin}>
              Log In
            </ButtonDark>
          </div>
          <div className="oauth-container">
            <div onClick={googleOAuthHandler} className="oauth-content">
              <div className="oauth-btn"></div>
              <div> 페이스북 로그인</div>
            </div>
            <div className="oauth-content">
              <div onClick={facebookOAuthHandler} className="oauth-btn"></div>
              <div> 구글 로그인</div>
            </div>
          </div>
          <div onClick={GotoSign} className="go-sign">
            I&apos;m new
          </div>
        </BottomContainer>
      </LoginContainer>
    </Container>
  );
};

export default Login;
