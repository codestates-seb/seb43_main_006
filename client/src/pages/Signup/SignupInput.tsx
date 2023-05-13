import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ButtonDark, ButtonLight } from "../../components/Common/Button";
import { useState, useEffect } from "react";
import { ChangeEvent } from "react";
import Alert from "../../components/Common/AlertModal";
import axios from "axios";
import useAxiosAll from "../../hooks/useAxiosAll";

const url = `${process.env.REACT_APP_API_URL}/`;

type TitleProps = {
  fontSize: string;
  fontWeight: string;
};
type StepProps = {
  type: string;
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.fontColor};
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 20px;
`;

const InputContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  width: 700px;
  gap: 40px;
  position: absolute;
  top: 25%;
  .title {
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #434242;
  }
  .code {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 35%;
  }
  padding-bottom: 60px;
`;

const Title = styled.div<TitleProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  gap: 20px;
  margin-bottom: 50px;
`;
const StepContainer = styled.div`
  font-size: 18px;
  ${({ theme }) => theme.common.flexCenterRow};
`;
const Step = styled.div<StepProps>`
  ${({ theme }) => theme.common.flexCenterRow};
  color: ${({ type }) => (type === "on" ? "#A84448" : "#b2b2b2")};
  .text {
    margin-left: 5px;
    font-size: 14px;
  }
`;
const MiddleContainer = styled.div`
  width: 100%;
`;
const InfoTable = styled.div`
  padding-top: 20px;
  ${({ theme }) => theme.common.flexCenterCol};
  width: 100%;
`;
const SingleInfo = styled.div`
  position: relative;
  width: 100%;
  ${({ theme }) => theme.common.flexCenterRow};
  font-size: 16px;
  border-bottom: 1px solid #b2b2b2;
  p {
    width: 50%;
  }
  .name {
    display: flex;
    align-items: center;
    width: 190px;
    padding: 20px;
    background-color: #ededed;
    &.email {
      height: 90px;
    }
  }
  .code-pos {
    position: absolute;
    right: 5%;
    top: 10%;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    width: calc(100% - 190px);
    padding: 10px;
    input {
      border: 1px solid #b2b2b2;
      padding: 5px 10px;
      font-size: 16px;
      width: 80%;
    }
  }
`;
const BottomContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterRow}
  gap: 15px;
`;

const SignupInput = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nick, setNick] = useState("");
  const [birth, setBirth] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true); // 비밀번호 형식대로 입력 확인후 비밀번호 확인 란 활성화
  const [showAlert, setShowAlert] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [doAxios, data, err, ok] = useAxiosAll();

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
      setAlertMessage("성인이 아닙니다!");
      setShowAlert(true);
    } else {
      setBirth(e.target.value);
    }
  };

  const onNumber = (e: ChangeEvent<HTMLInputElement>) => {
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
  const onPasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  useEffect(() => {
    if (err) {
      setAlertMessage("자신의 나이 혹은 이메일을 확인해주세요!");
      setShowAlert(true);
    }
  }, [err]);
  useEffect(() => {
    console.log(ok);
    if (ok) {
      setAlertMessage("회원가입 성공!");
      setShowAlert(true);
      setIsOk(true);
    }
  }, [ok]);
  const onClickSign = () => {
    if (password !== passwordCheck) {
      setAlertMessage("비밀번호와 비밀번호 확인이 같지 않습니다!");
    } else if (!(nick && code && name && birth && number)) {
      setAlertMessage("모든 정보가 입려되어야 합니다!");
    } else {
      const body = {
        realName: name,
        displayName: nick,
        email: email,
        password: password,
        phone: number,
        birthDate: birth,
        mailKey: code,
      };
      console.log(body);
      doAxios("post", "/members/signup", body, false, false);
      // axios
      //   .post(`${url}members/signup`, body, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //   .then((res) => {
      //     setAlertMessage("회원가입 성공!");
      //     setShowAlert(true);
      //     setIsOk(true);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setAlertMessage("자신의 나이 혹은 이메일을 확인해주세요!");
      //     setShowAlert(true);
      //   });
    }
  };
  const getCode = () => {
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
        setAlertMessage("이메일 코드가 전송되었습니다!");
        setShowAlert(true);
        console.log(res);
      })
      .catch((err) => {
        setAlertMessage("없는 이메일 입니다!");
        setShowAlert(true);
        console.log(err);
      });
  };
  const okGotoMain = () => {
    setShowAlert(false);
    navigate("/");
  };
  return (
    <Container>
      {showAlert ? <Alert text={alertMessage} onClick={isOk ? okGotoMain : () => setShowAlert(false)} /> : null}
      <InputContainer>
        <TopContainer>
          <Title fontSize="28px" fontWeight="500">
            회원가입
          </Title>
          <StepContainer>
            <Step type="off">
              01<p className="text">약관동의</p>
            </Step>
            <MdOutlineKeyboardArrowRight size="22px" color="#A84448" />
            <Step type="on">
              02<p className="text">정보 입력</p>
            </Step>
          </StepContainer>
        </TopContainer>
        <MiddleContainer>
          <div className="title">
            <Title fontSize="22px" fontWeight="400">
              기본정보
            </Title>
          </div>
          <InfoTable>
            <SingleInfo>
              <div className="name email">이메일</div>
              <div className="code-pos">
                <ButtonDark
                  width="60px"
                  height="30px"
                  fontSize="12px"
                  fontWeight="500"
                  borderRadious="30px"
                  onClick={getCode}
                >
                  인증요청
                </ButtonDark>
              </div>
              <div className="input-container">
                <input onChange={onEmail} />
                <div className="code">
                  <p>인증코드</p>
                  <input onChange={onCode} className="code-input" />
                </div>
              </div>
            </SingleInfo>
            <SingleInfo>
              <div className="name">비밀번호</div>
              <div className="input-container">
                <input type="password" placeholder="문자, 숫자를 결합해 8자 이상" onChange={onPassword} />
              </div>
            </SingleInfo>
            <SingleInfo>
              <div className="name">비밀번호 확인</div>
              <div className="input-container">
                <input
                  className={isDisabled ? "disable" : ""}
                  type="password"
                  placeholder={isDisabled ? "비밀번호를 먼저 옳바르게 입력하세요" : ""}
                  disabled={isDisabled}
                  onChange={onPasswordCheck}
                />
              </div>
            </SingleInfo>
            <SingleInfo>
              <div className="name">이름</div>
              <div className="input-container">
                <input onChange={onName} />
              </div>
            </SingleInfo>
            <SingleInfo>
              <div className="name">닉네임</div>
              <div className="input-container">
                <input onChange={onNick} />
              </div>
            </SingleInfo>
            <SingleInfo>
              <div className="name">생년월일</div>
              <div className="input-container">
                <input value={birth} type="date" onChange={onBirth} />
              </div>
            </SingleInfo>
            <SingleInfo>
              <div className="name">전화번호</div>
              <div className="input-container">
                <input value={number} onChange={onNumber} />
              </div>
            </SingleInfo>
          </InfoTable>
        </MiddleContainer>
        <BottomContainer>
          <ButtonLight
            width="150px"
            height="45px"
            fontSize="18px"
            borderRadious="2px"
            onClick={() => navigate("/signup/term")}
          >
            이전
          </ButtonLight>
          <ButtonDark width="150px" height="45px" fontSize="18px" borderRadious="2px" onClick={onClickSign}>
            회원가입
          </ButtonDark>
        </BottomContainer>
      </InputContainer>
    </Container>
  );
};

export default SignupInput;
