import styled from "styled-components";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import axios from "axios";
//components
import Alert from "@components/Common/AlertModal";
import { ButtonDark, ButtonLight } from "@components/Common/Button";

const url = `${process.env.REACT_APP_API_URL}`;

type TypeProps = {
  type: string;
};

type TitleProps = {
  fontSize: string;
  fontWeight: string;
};

const Login = () => {
  const navigate = useNavigate();
  // 이름, 비밀번호, 알람 메시지, 알람여부 상태
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("needLogin")) {
      setAlertMessage("로그인이 필요합니다!");
      setShowAlert(true);
      localStorage.removeItem("needLogin");
    }
  }, []);
  function convertToSeconds(dateString: string): string {
    dateString = dateString.replace("/", "T");
    const date = new Date(dateString);
    const seconds = Math.floor(date.getTime() / 1000); // 초 단위 변환

    return `${seconds}`;
  }

  const userNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 아이디 핸들러
    setUsername(e.target.value);
  };
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 핸들러
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // 로그인 요청
    LoginAxios();
  };
  const LoginAxios = () => {
    const body = {
      username,
      password,
    };
    axios
      .post(`${url}/auth/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const token = res.headers.authorization;

        const iat_sec = convertToSeconds(res.headers.iat);
        const exp_sec = convertToSeconds(res.headers.exp);
        const issued = res.headers["x-password-issued"]; // 임시비밀번호로 로그인한 회원인지
        localStorage.setItem("authToken", token.replace(/^Bearer\s/, "")); // 토큰 저장
        localStorage.setItem("refresh", res.headers.refresh); // refresh 토큰 저장
        localStorage.setItem("exp", exp_sec); // 토큰 만료시간 저장
        localStorage.setItem("memberId", res.headers["x-member-id"]); // member id 저장
        localStorage.setItem("iat", iat_sec); // refresh 토큰 생성 시간 저장
        if (issued === "false") {
          // 임시 비밀번호로 접근 x
          navigate("/");
        } else {
          // 임시 비밀번호로 접근 o
          navigate("/mypage/changeinfo");
        }
      })
      .catch(() => {
        // 로그인 요청 실패 시
        setAlertMessage("이메일 혹은 비밀번호를 확인해주세요!");
        setShowAlert(true);
      });
  };
  const googleOAuthHandler = () => {
    //오어스 구글 인증링크 이동
    window.location.assign(`${url}/oauth2/authorization/google`);
  };
  const naverOAuthHandler = () => {
    //오어스 네이버 인증링크로 이동
    window.location.assign(`${url}/oauth2/authorization/naver`);
  };
  const kakaoOAuthHandler = () => {
    window.location.assign(`${url}/oauth2/authorization/kakao`);
  };
  const GotoSign = () => {
    // 회원가입 버튼 클릭 시
    navigate("/signup");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      LoginAxios();
    }
  };
  return (
    <Container>
      {showAlert ? <Alert text={alertMessage} onClickOk={() => setShowAlert(false)} /> : null}
      <ContentsContainer>
        <TopContainer>
          <Title className="top-title" fontSize="28px" fontWeight="500">
            로그인
          </Title>
        </TopContainer>
        <MiddleContainer>
          <LoginContainer>
            <Title fontSize="22px" fontWeight="400">
              회원 로그인
            </Title>
            <div className="flex-row">
              <form className="flex-col">
                <input placeholder="이메일" type="email" onChange={userNameHandler} onKeyDown={handleKeyDown} />
                <input
                  placeholder="비밀번호"
                  type="password"
                  autoComplete="off"
                  onChange={passwordHandler}
                  onKeyDown={handleKeyDown}
                />
              </form>
              <div className="button">
                <ButtonDark width="100%" height="100%" fontSize="18px" fontWeight="500" onClick={handleLogin}>
                  로그인
                </ButtonDark>
              </div>
            </div>
          </LoginContainer>
          <OAuthSignUpBox onClick={googleOAuthHandler} type="google">
            <OAuthIconContainer>
              <FcGoogle size="35" color="black" />
            </OAuthIconContainer>
            <div className="desc">구글로 시작하기</div>
          </OAuthSignUpBox>
          <OAuthSignUpBox onClick={naverOAuthHandler} type="naver">
            <OAuthIconContainer>
              <SiNaver size="25" color="white" />
            </OAuthIconContainer>
            <div className="desc">네이버로 시작하기</div>
          </OAuthSignUpBox>
          <OAuthSignUpBox onClick={kakaoOAuthHandler} type="kakao">
            <OAuthIconContainer>
              <RiKakaoTalkFill size="35" color="black" />
            </OAuthIconContainer>
            <div className="desc">카카오톡으로 시작하기</div>
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
  max-width: 600px;
  width: 100%;
  position: absolute;
  top: 15%;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
    padding-bottom: 50px;
    padding: 0 25px;
    .top-title {
      display: none;
    }
  }
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
  @media screen and (max-width: 768px) {
    margin-bottom: 0px;
  }
`;
const Title = styled.div<TitleProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 50px 60px;
  @media screen and (max-width: 768px) {
    padding: 0px;
    gap: 10px;
  }
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: white;
  @media screen and (max-width: 768px) {
    background-color: inherit;
    border: none;
  }
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  gap: 20px;
  margin-bottom: 30px;
  .flex-col {
    width: 80%;
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
    @media screen and (max-width: 768px) {
      gap: 10px;
    }
    .button {
      width: 30%;
      @media screen and (max-width: 768px) {
        width: 20%;
      }
    }
  }
`;

const OAuthSignUpBox = styled.div<TypeProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ type }) => (type === "google" ? "white" : type === "naver" ? "#03C75A" : "#ffeb00")};
  color: ${({ type }) => (type === "google" || type === "kakao" ? "black" : "white")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  .desc {
    font-size: 18px;
    width: calc(100% - 65px);
    text-align: center;
    @media ${({ theme }) => theme.breakpoints.mobileMax} {
      font-size: 14px;
    }
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
  @media screen and (max-width: 768px) {
    height: 55px;
  }
`;

const BottomContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterRow}
  width: 100%;
  gap: 15px;
  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

export default Login;
