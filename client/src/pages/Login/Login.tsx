import styled from "styled-components";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonDark, ButtonLight } from "../../components/Common/Button";
import { TiSocialFacebook } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
import Alert from "../../components/Common/AlertModal";
import useAxiosAll from "../../hooks/useAxiosAll";
import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/`;

type TypeProps = {
  type: string;
};

type TitleProps = {
  fontSize: string;
  fontWeight: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [doAxios, data, err] = useAxiosAll();

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
    axios
      .post(`${url}auth/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        const issued = res.headers["x-password-issued"];
        localStorage.setItem("authToken", res.headers.authorization);
        localStorage.setItem("memberId", res.headers["x-member-id"]);
        console.log(issued);
        if (issued === "false") {
          navigate("/");
        } else {
          navigate("/mypage/changeinfo");
        }
      })
      .catch((err) => {
        console.log("실패", err);
        setAlertMessage("이메일 혹은 비밀번호를 확인해주세요!");
        setShowAlert(true);
      });
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
      {showAlert ? <Alert text={alertMessage} onClick={() => setShowAlert(false)} /> : null}
      <ContentsContainer>
        <TopContainer>
          <Title fontSize="28px" fontWeight="500">
            로그인
          </Title>
        </TopContainer>
        <MiddleContainer>
          <LoginContainer>
            <Title fontSize="22px" fontWeight="400">
              회원 로그인
            </Title>
            <div className="flex-row">
              <div className="flex-col">
                <input placeholder="이메일" onChange={emailHandler} />
                <input placeholder="비밀번호" type="password" onChange={passwordHandler} />
              </div>
              <div className="button">
                <ButtonDark width="100%" height="100%" fontSize="18px" fontWeight="500" onClick={handleLogin}>
                  로그인
                </ButtonDark>
              </div>
            </div>
          </LoginContainer>
          <OAuthSignUpBox onClick={googleOAuthHandler} type="google">
            <OAuthIconContainer>
              <FcGoogle size="40" color="black" />
            </OAuthIconContainer>
            <div className="desc">구글로 시작하기</div>
          </OAuthSignUpBox>
          <OAuthSignUpBox onClick={facebookOAuthHandler} type="facebook">
            <OAuthIconContainer>
              <TiSocialFacebook size="40" color="white" />
            </OAuthIconContainer>
            <div className="desc">페이스북으로 시작하기</div>
          </OAuthSignUpBox>
          <Contour />
          <BottomContainer>
            <ButtonDark width="150px" height="100%" fontSize="18px" fontWeight="500" onClick={GotoSign}>
              회원가입
            </ButtonDark>
            <ButtonLight
              width="150px"
              height="100%"
              fontSize="16px"
              fontWeight="500"
              onClick={() => {
                navigate("/findemail");
              }}
            >
              이메일 찾기
            </ButtonLight>
            <ButtonLight
              width="150px"
              height="100%"
              fontSize="16px"
              fontWeight="500"
              onClick={() => {
                navigate("/findpassword");
              }}
            >
              비밀번호 찾기
            </ButtonLight>
          </BottomContainer>
        </MiddleContainer>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  ${({ theme }) => theme.common.flexCenterCol};
`;
const ContentsContainer = styled.div`
  width: 600px;
  position: absolute;
  top: 15%;
`;
const Contour = styled.hr`
  width: 100%;
  border-color: #eee;
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  gap: 20px;
  margin-bottom: 30px;
`;
const Title = styled.div<TitleProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 50px 60px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: white;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
  margin-bottom: 30px;
  .flex-col {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    input {
      border: 1px solid #b2b2b2;
      padding: 10px 10px;
      font-size: 16px;
      width: 100%;
    }
  }
  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 30px;
  }
  .button {
    width: 30%;
  }
`;

const OAuthSignUpBox = styled.div<TypeProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ type }) => (type === "google" ? "white" : "#4566a0")};
  color: ${({ type }) => (type === "google" ? "black" : "white")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  .desc {
    font-size: 18px;
    width: calc(100% - 65px);
    text-align: center;
  }
  border-radius: 2px;
  cursor: pointer;
`;
const OAuthIconContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  height: 65px;
  width: 65px;
  padding: 5px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  .icon {
    width: 35px;
  }
`;

const BottomContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterRow}
  width: 100%;
  gap: 15px;
`;

export default Login;
