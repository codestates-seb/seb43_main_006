import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { Button } from "../components/Common/Button";
import { ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Maintop from "../assets/images/login-bg.png";

const url = "https://25ff-124-111-225-247.ngrok-free.app/";

const Container = styled.div`
  position: relative;
  ${({ theme }) => theme.common.flexCenterCol};
  width: 100vw;
  height: 120vh;
  .main {
    ${({ theme }) => theme.common.flexCenterCol};
  }
`;
const Back = styled.div`
  width: 100%;
  height: 150%;
  background-image: url(${Maintop});
  background-size: cover;
  position: absolute;
  width: inherit;
  z-index: -1;
  filter: blur(5px);
`;
const MainContainer = styled.div`
  width: 700px;
  position: absolute;
  top: 100px;
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 40px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: ${({ theme }) => theme.colors.bg};
  padding: 50px 0px;
  .disabled {
    pointer-events: none;
    cursor: default;
    filter: brightness(80%);
  }
  .go-login {
    position: absolute;
    bottom: 30px;
    right: 30px;
    color: ${({ theme }) => theme.colors.themeColor};
    float: right;
    margin-top: 20px;
    text-decoration: underline;
    cursor: pointer;
  }
  border-radius: 5px;
  overflow-y: auto;
`;

const TermsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  padding-bottom: 20px;
  border-bottom: 1px solid #b7b7b7;
`;
const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
  .check-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
  }
  .all {
    font-size: 16px;
    font-weight: 600;
  }
  .red {
    color: red;
    margin-left: 5px;
  }
  .dsc {
    ${({ theme }) => theme.common.flexCenterRow};
  }
  .detail {
    margin-left: 50%;
    cursor: pointer;
  }
`;
const BtnContainer = styled.div`
  ${({ theme }) => theme.common.flexCol};
  width: 100%;
`;

const GreetingContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.common.flexCenter};
  color: ${({ theme }) => theme.colors.themeColor};
  font-size: 30px;
  font-weight: 600;
`;
const TermDetail = styled.div`
  height: 200px;
  width: 100%;
  padding: 20px;
  background-color: white;
  font-size: 14px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  white-space: pre-wrap;
  overflow: scroll;
`;

const UserInfoContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  width: 70%;
  gap: 30px;
  .email-container {
    width: 100%;
    position: relative;
  }
  .code-pos {
    position: absolute;
    right: -70px;
    top: 5px;
  }
`;
const InputContainer = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  .title {
    width: 150px;
    font-size: 18px;
  }
  .input {
    height: 45px;
    width: 100%;
    font-size: 16px;
    background-color: inherit;
    border: 1px solid #b7b7b7;
    padding: 10px 15px;
    border-radius: 5px;
    &.dark {
      background-color: lightgray;
    }
  }
  .alter {
    position: absolute;
    right: 10%;
    color: red;
    font-size: 10px;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const AlertContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 15px;
  position: fixed;
  top: 300px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  height: 100px;
  width: 360px;
  padding: 30px;
  .ok {
    padding: 5px 10px;
    background-color: #1a73e8;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
`;
const Signup = () => {
  const detailDummy =
    "[가상의 주류 회사명] 이용 약관\n\n약관 시행일자: 2023년 5월 10일\n\n\n[가상의 주류 회사명] (이하 &apos;회사&apos;라 함)는 고객의 개인정보 보호를 위하여 최선을 다하며, 고객의 권리 보호를 위하여 다음과 같은 이용 약관을 제정하고 이에 따라 서비스를 제공합니다.\n\n\n제 1조 (목적)\n\n이 약관은 회사가 제공하는 서비스의 이용과 관련하여 회사와 고객 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제 2조 (용어의 정의)\n\n&apos;서비스&apos;는 회사가 제공하는 서비스를 의미합니다.\n\n&apos;고객&apos;이란 회사의 서비스를 이용하는 자를 의미합니다.\n\n&apos;아이디(ID)&apos;란 회원의 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 회사가 승인한 문자와 숫자의 조합을 의미합니다.\n\n&apos;비밀번호&apos;란 회원이 부여받은 아이디와 일치된 회원임을 확인하고 회원의 개인정보를 보호하기 위해 회원이 선정한 문자와 숫자의 조합을 의미합니다.\n\n&apos;회원&apos;이란 회사와 서비스 이용계약을 체결하고 이 약관에 따라 서비스를 이용하는 고객을 의미합니다.\n\n제 3조 (서비스 이용 계약)\n\n회사의 서비스 이용계약은 고객의 이용신청과 회사의 승낙에 의해 성립합니다.\n\n회사는 고객의 서비스 이용신청에 대하여 승낙함을 원칙으로 합니다.\n\n회사는 고객의 이용신청에 대하여 다음 각 호에 해당하는 경우 승낙하지 않을 수 있습니다.\n\n본인의 실명으로 신청하지 않은 경우\n\n이용 신청서의 내용을 허위로 기재한 경우\n\n회사가 제공하는 서비스와 관련하여 이용자에게 제공되는 정보를 기재하지 않은 경우\n\n기타 회사가 정한 이용신청 요건이 미비한 경우\n\n회사는 고객의 이용신청에 대하여 승낙함을 원칙으로 하되, 다음 각 호에 해당하는 경우 사전 통지 없이 승낙을 거부할 수 있습니다.\n\n고객의 서비스 이용에 대하여 제한을 필요로 하는 경우";
  const themeContext = useContext(ThemeContext).colors;

  const [allCheck, setAllCheck] = useState(false);
  const [adult, setAdult] = useState(false);
  const [service, setService] = useState(false);
  const handleAllCheck = () => {
    if (allCheck === false) {
      setAdult(true);
      setService(true);
      setAllCheck(true);
    } else {
      setAdult(false);
      setService(false);
      setAllCheck(false);
    }
  };
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [birth, setBirth] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");
  const [isDisabled, setIsDisabled] = useState(true); // 비밀번호 형식대로 입력 확인후 비밀번호 확인 란 활성화
  const [ready, setReady] = useState(false); // 모든 입력이 존재하고 비밀번호와 확인이 일치해야 버튼 활성화
  const [showDetail, setShowDetail] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [clickSign, setClickSign] = useState(false);
  const [isAdult, setIsAdult] = useState(true);

  const navigate = useNavigate();

  const onName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onNick = (e: ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value);
  };
  const onBirth = (e: ChangeEvent<HTMLInputElement>) => {
    const today = new Date();
    const birthDay = new Date(e.target.value);
    let age = today.getFullYear() - birthDay.getFullYear();
    if (
      birthDay.getMonth() > today.getMonth() ||
      (birthDay.getMonth() === today.getMonth() && birthDay.getDate() > today.getDate())
    ) {
      age = age - 1;
    }
    if (age <= 18) {
      setIsAdult(false);
      setAdult(false);
    } else {
      setIsAdult(true);
    }
    setBirth(e.target.value);
  };

  const onNumber = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const val = e.target.value.replace(/[^\d]/g, "").match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
    if (val) {
      setNumber(
        !val[2] ? val[1] : val[3] ? `${val[1]}-${val[2]}-${val[3]}` : val[2] ? `${val[1]}-${val[2]}` : `${val[1]}`,
      );
    } else {
    }
  };
  const onEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  const onPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const val = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value);
    console.log(isDisabled, e.target.value, val);
    if (val) {
      setPassword(e.target.value);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.value);
  };

  const getCode = () => {
    console.log(email);
    const body = {
      email,
    };
    axios
      .post(`${url}members/email`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClickSign(true);
        setIsPass(false);
        setAlertMessage("이메일 코드가 전송되었습니다!");
        console.log(res);
      })
      .catch((err) => {
        setClickSign(true);
        setIsPass(false);
        setAlertMessage("없는 이메일 입니다!");
        console.log(err);
      });
  };
  const onClickSign = () => {
    const body = {
      realName: name,
      displayName: nick,
      email: email,
      password: password,
      phone: number,
      birthDate: birth,
      mailKey: code,
    };
    axios
      .post(`${url}members/signup`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setClickSign(true);
        setIsPass(true);
        setAlertMessage("회원가입 성공!");
      })
      .catch((err) => {
        setClickSign(true);
        setIsPass(false);
        setAlertMessage("자신의 나이 혹은 이메일을 확인해주세요!");
      });
  };
  useEffect(() => {
    if (
      adult &&
      service &&
      name &&
      nick &&
      email &&
      code &&
      password &&
      number &&
      birth &&
      code &&
      password === check
    ) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [check]);
  return (
    <Container>
      <Back />
      <div className="main">
        <MainContainer>
          <GreetingContainer>Welcome</GreetingContainer>
          <UserInfoContainer>
            <TermsContainer>
              <CheckBoxContainer>
                <div className="check-content">
                  <input onClick={handleAllCheck} type="checkbox"></input>
                  <div className="all">약관 모두 동의하기</div>
                </div>
              </CheckBoxContainer>
              <CheckBoxContainer>
                <div className="check-content">
                  <input onChange={() => setAdult((pre) => !pre)} checked={adult} type="checkbox"></input>
                  <div className="dsc">
                    만 18세 이상입니다. <p className="red">(필수)</p>
                  </div>
                </div>
              </CheckBoxContainer>
              <CheckBoxContainer>
                <div className="check-content">
                  <input onChange={() => setService((pre) => !pre)} checked={service} type="checkbox"></input>
                  <div className="dsc">
                    서비스 이용 약관 <p className="red">(필수)</p>
                  </div>
                </div>
                <span onClick={() => setShowDetail((pre) => !pre)} className="detail">
                  {showDetail ? "닫기" : "자세히"}
                </span>
              </CheckBoxContainer>
              {showDetail ? <TermDetail>{detailDummy}</TermDetail> : null}
            </TermsContainer>

            <InputContainer>
              <div className="title">이름</div>
              <input onChange={onName} className="input" />
            </InputContainer>
            <InputContainer>
              <div className="title">닉네임</div>
              <input onChange={onNick} className="input" />
            </InputContainer>
            <InputContainer>
              <div className="title">생년월일</div>
              <input type="date" onChange={onBirth} className="input" />
              {isAdult ? null : <p className="alter">성인이 아닙니다!</p>}
            </InputContainer>
            <InputContainer>
              <div className="title">전화번호</div>
              <input value={number} maxLength={13} onChange={onNumber} className="input" />
            </InputContainer>
            <div className="email-container">
              <InputContainer>
                <div className="title">E-mail</div>
                <input type="email" onChange={onEmail} className="input" />
              </InputContainer>
              <div className="code-pos">
                <Button
                  width="60px"
                  height="35px"
                  bg="#B0A4A4"
                  color="white"
                  fontSize="12px"
                  fontWeight="500"
                  borderRadious="30px"
                  onClick={getCode}
                >
                  인증요청
                </Button>
              </div>
            </div>

            <InputContainer>
              <div className="title">메일 인증코드</div>
              <input type="number" onChange={onCode} className="input" />
            </InputContainer>
            <InputContainer>
              <div className="title">비밀번호</div>
              <input
                autoComplete="off"
                type="password"
                title="문자, 숫자 포함 최소 8자 이상"
                onChange={onPassword}
                className="input"
              />
            </InputContainer>
            <InputContainer>
              <div className="title">비밀번호 확인</div>
              <input
                disabled={isDisabled}
                autoComplete="off"
                type="password"
                onChange={onCheck}
                className={isDisabled ? "input dark" : "input"}
              />
            </InputContainer>
          </UserInfoContainer>

          <BtnContainer className={ready ? "" : "disabled"}>
            {ready ? (
              <Button
                width="50%"
                height="45px"
                bg={themeContext["themeColor"]}
                color="white"
                fontSize="18px"
                borderRadious="7px"
                onClick={onClickSign}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                width="50%"
                height="45px"
                bg="gray"
                color="white"
                fontSize="18px"
                borderRadious="7px"
                onClick={onClickSign}
              >
                Sign Up
              </Button>
            )}
          </BtnContainer>
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="go-login"
          >
            I&apos;ve been here
          </div>
        </MainContainer>
      </div>
      {clickSign ? (
        <AlertContainer>
          {alertMessage}
          <div onClick={isPass ? () => navigate("/login") : () => setClickSign(false)} className="ok">
            확인
          </div>
        </AlertContainer>
      ) : null}
    </Container>
  );
};

export default Signup;
