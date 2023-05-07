import styled, { ThemeContext } from "styled-components";
import { useContext, useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "https://ee61-124-111-225-247.ngrok-free.app/";
const LoginContainer = styled.section`
  width: 618px;
  ${({ theme }) => theme.common.flexCenterCol};
`;
const TopContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 90px;
  width: 100%;
  height: 128px;

  .greeting {
    color: ${({ theme }) => theme.colors.themeColor};
    font-size: 30px;
    font-weight: 600;
  }
`;
const BottomContainer = styled.div`
  width: 100%;
  height: 618px;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 50px 36px;
  .input-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 60px;
  }
  .oauth-container {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
  }
`;
const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  height: 100px;
  width: 100%;
  font-weight: 600;
  .title {
    font-size: 20px;
  }
  .input {
    font-size: 20px;
    border-bottom: 1px solid gray;
  }
`;
const Button = styled.button`
  ${({ theme }) => theme.common.flexCenter};

  height: 52px;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  background-color: ${(props) => props.color};
  ${(props) => (props.color === "white" ? "color : black" : "color : white")}
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
  return (
    <LoginContainer>
      <TopContainer>
        <div className="greeting">Get Started</div>
      </TopContainer>
      <BottomContainer>
        <div className="input-container">
          <InputContainer>
            <div className="title">E-mail</div>
            <input autoComplete="on" onChange={emailHandler} className="input"></input>
          </InputContainer>
          <InputContainer>
            <div className="title">Password</div>
            <input autoComplete="off" onChange={passwordHandler} type="password" className="input"></input>
          </InputContainer>
        </div>
        <div className="oauth-container">
          <Button onClick={handleLogin} color={themeContext["themeColor"]} name="Login">
            Login
          </Button>
          <Button onClick={googleOAuthHandler} color="white" name="google">
            Google
          </Button>
          <Button onClick={facebookOAuthHandler} color="#0000f7" name="Face Book">
            Face Book
          </Button>
        </div>
      </BottomContainer>
    </LoginContainer>
  );
};

export default Login;
