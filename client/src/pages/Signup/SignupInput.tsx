import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
//hooks
import useAxiosAll from "@hooks/useAxiosAll";
//components
import { ButtonDark, ButtonLight } from "@components/Common/Button";
import Alert from "@components/Common/AlertModal";

const url = `${process.env.REACT_APP_API_URL}/`;

type TitleProps = {
  fontSize: string;
  fontWeight: string;
};
type StepProps = {
  type: string;
};

const SignupInput = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(""); // 이름 input 상태
  const [nick, setNick] = useState(""); // 닉네임 input 상태
  const [birth, setBirth] = useState(""); // 생일 input 상태
  const [number, setNumber] = useState(""); // 전화번호 input 상태
  const [email, setEmail] = useState(""); // 이메일 input 상태
  const [code, setCode] = useState(""); // 코드 input 상태
  const [password, setPassword] = useState(""); // 비밀번호 input 상태
  const [passwordCheck, setPasswordCheck] = useState(""); // 비밀번호 확인 input 상태
  const [alertMessage, setAlertMessage] = useState(""); // 알람 메시지 상태
  const [isDisabled, setIsDisabled] = useState(true); // 비밀번호 형식대로 입력 확인후 비밀번호 확인 란 활성화
  const [showAlert, setShowAlert] = useState(false); // 알림 띄우기 상태
  const [isOk, setIsOk] = useState(false); // 성공 여부 상태 --> 알람 확인의 onClick 이벤트 별도로 주기 위해
  const [doAxios, data, err, ok] = useAxiosAll(); // axios 요청 응답 에러여부 확인
  const [type, setType] = useState<string | null>(null);
  const onName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value); // 이름 onChange 핸들러
  };
  const onNick = (e: ChangeEvent<HTMLInputElement>) => {
    setNick(e.target.value); // 닉네임 onChange 핸들러
  };
  const onBirth = (e: ChangeEvent<HTMLInputElement>) => {
    // 이름 onChange 핸들러
    const today = new Date();
    const birthDay = new Date(e.target.value);
    let age = today.getFullYear() - birthDay.getFullYear(); // 현재 Year과 입력한 Year로만 계산한 나이
    if (
      birthDay.getMonth() > today.getMonth() ||
      (birthDay.getMonth() === today.getMonth() && birthDay.getDate() > today.getDate()) //월, 일 까지 계산해 만 나이 적용
    ) {
      age = age - 1;
    }
    if (age <= 18) {
      // 만 18 이상인지 아닌지 확인
      setAlertMessage("성인이 아닙니다!");
      setShowAlert(true);
    } else {
      setBirth(e.target.value);
    }
  };

  const onNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, "").match(/(\d{0,3})(\d{0,4})(\d{0,4})/); // 숫자만 입력 가능, 배열로서 앞의 3개, 4개, 4개 숫자 저장
    if (val) {
      setNumber(
        !val[2] ? val[1] : val[3] ? `${val[1]}-${val[2]}-${val[3]}` : val[2] ? `${val[1]}-${val[2]}` : `${val[1]}`, // 전화번호 형식의 문자열로 숫자 저장되도록 함
      );
    }
  };
  const onEmail = (e: ChangeEvent<HTMLInputElement>) => {
    // 이메일 onChange 핸들러
    setEmail(e.target.value);
  };
  const onCode = (e: ChangeEvent<HTMLInputElement>) => {
    // 인증코드 onChange 핸들러
    setCode(e.target.value);
  };
  const onPassword = (e: ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 onChange 핸들러
    const val = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(e.target.value); // 문자와 숫자로 조합된 8자리 이상으로 비밀번호가 구성되었는지 확인

    if (val) {
      // true
      setPassword(e.target.value); // 비밀번호를 저장
      setIsDisabled(false); // 비밀번호 확인 input disable 해제
    } else {
      //false
      setIsDisabled(true); // 비밀번호 확인 input disable
    }
  };
  const onPasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    // 비밀번호 확인 onChange 핸들러
    setPasswordCheck(e.target.value);
  };

  const onClickSign = () => {
    // 회원가입 버튼 클릭 시
    if (type === "oauth") {
      const body = {
        realName: name,
        displayName: nick,
        phone: number,
        birthDate: birth,
      };
      console.log(body);
      axios
        .post(`${process.env.REACT_APP_API_URL}/members/oauth2-signup`, body, {
          headers: {
            Authorization: localStorage.getItem("authToken"),
            refresh: localStorage.getItem("refresh"),
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((res) => {
          setAlertMessage("회원가입 성공!");
          setShowAlert(true);
          setIsOk(true);
        })
        .catch((err) => {
          setAlertMessage("모든 정보를 기입하였는지 확인하세요!");
          setShowAlert(true);
        });
    } else {
      if (password !== passwordCheck) {
        // 비밀번호와 비밀번호 확인 입력이 일치하지 않을 경우
        setAlertMessage("비밀번호와 비밀번호 확인이 같지 않습니다!");
      } else if (!(nick && code && name && birth && number)) {
        // 모든 정보가 입력이 안되었을 경우
        setAlertMessage("모든 정보가 입력되어야 합니다!");
      } else {
        // 요청 body
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
        axios
          .post(`${process.env.REACT_APP_API_URL}/members/signup`, body, {
            headers: {
              Authorization: localStorage.getItem("authToken"),
              refresh: localStorage.getItem("refresh"),
              "ngrok-skip-browser-warning": "69420",
            },
          })
          .then((res) => {
            setAlertMessage("회원가입 성공!");
            setShowAlert(true);
            setIsOk(true);
          })
          .catch((err) => {
            setAlertMessage("모든 정보를 기입하였는지와 이메일을 확인해주세요");
            setShowAlert(true);
          });
      }
    }
  };
  const getCode = () => {
    // 인증 코드 요청 axios
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
        // 인증 코드 요청 성공시 알람창
        setAlertMessage("이메일 코드가 전송되었습니다!");
        setShowAlert(true);
        console.log(res);
      })
      .catch((err) => {
        // 인증 코드 요청 실패시 알람창
        setAlertMessage("없는 이메일 입니다!");
        setShowAlert(true);
        console.log(err);
      });
  };
  const okGotoLogin = () => {
    // 회원가입 성공시 알림창 확인 onClick 핸들러
    setShowAlert(false);
    navigate("/login");
  };
  useEffect(() => {
    const style = localStorage.getItem("oauthSign");
    if (style === "true") {
      setType("oauth");
    } else if (style === "false") {
      setType("normal");
    } else {
      setType(null);
      setAlertMessage("잘못된 경로로 접근함!");
      setShowAlert(true);
    }
    localStorage.removeItem("oauthSign");
  }, []);
  return (
    <Container>
      {showAlert ? <Alert text={alertMessage} onClickOk={isOk ? okGotoLogin : () => setShowAlert(false)} /> : null}
      {type ? (
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
              {type === "oauth" ? null : (
                <>
                  <SingleInfo>
                    <div className="name email">이메일</div>
                    <div className="code-pos">
                      <ButtonDark width="60px" height="30px" fontSize="12px" borderRadious="30px" onClick={getCode}>
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
                </>
              )}

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
            <ButtonLight width="150px" height="45px" fontSize="18px" onClick={() => navigate("/signup/term")}>
              이전
            </ButtonLight>
            <ButtonDark width="150px" height="45px" fontSize="18px" borderRadious="2px" onClick={onClickSign}>
              회원가입
            </ButtonDark>
          </BottomContainer>
        </InputContainer>
      ) : null}
    </Container>
  );
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
  top: 15%;
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

export default SignupInput;
