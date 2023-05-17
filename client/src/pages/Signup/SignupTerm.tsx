import styled from "styled-components";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import { ButtonDark, ButtonLight } from "@components/Common/Button";
import Alert from "@components/Common/AlertModal";
import Term from "@components/SignupTerm/Term";

type StepProps = {
  type: string;
};
type TitleProps = {
  fontSize: string;
  fontWeight: string;
};

const BottomContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterRow}
  gap: 15px;
`;

const SignupTerm = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState([false, false, false]);
  const [isNext, setIsNext] = useState(false);
  const [isAgreed, setIsAgreed] = useState([false, false, false, false]);
  const [alertMessage, setAlertMessage] = useState(""); // 알람 메시지 상태

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
    if (accessToken && refreshToken) {
      localStorage.setItem("authToken", accessToken); // 토큰 저장
      localStorage.setItem("refresh", refreshToken); // refresh 토큰 저장

      axios
        .get(`${process.env.REACT_APP_API_URL}/members`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
            "ngrok-skip-browser-warning": "69420",
          },
        })
        .then((res) => {
          navigate("/");
          console.log("유저임");
        })
        .catch((err) => {
          console.log("유저아님");
          localStorage.setItem("oauthSign", "true"); // 오어스로 회원가입 시도
          setAlertMessage("회원가입을 진행해 주세요!");
          setIsNext(true);
        });
    } else {
      localStorage.setItem("oauthSign", "false"); // 일반 회원가입 시도
    }
  }, []);
  const clickDetail = (pos: number) => {
    const newDetail = detail.slice();
    newDetail[pos] = !detail[pos];
    setDetail(newDetail);
  };
  const clickCheck = (pos: number) => {
    const newCheck = isAgreed.slice();
    newCheck[pos] = !isAgreed[pos];
    setIsAgreed(newCheck);
  };
  const onClickNext = () => {
    if (isAgreed[0] && isAgreed[1] && isAgreed[2] && isAgreed[3]) {
      navigate("/signup/input");
    } else {
      setAlertMessage("모든 약관을 동의해 주세요!");
      setIsNext(true);
    }
  };
  const onClickToSelection = () => {
    navigate("/signup");
  };
  return (
    <Container>
      {isNext ? <Alert text={alertMessage} onClickOk={() => setIsNext(false)} /> : null}
      <TermContainer>
        <TopContainer>
          <Title fontSize="28px" fontWeight="500">
            회원가입
          </Title>
          <StepContainer>
            <Step type="on">
              01<p className="text">약관동의</p>
            </Step>
            <MdOutlineKeyboardArrowRight size="22px" color="#A84448" />
            <Step type="off">
              02<p className="text">정보 입력</p>
            </Step>
          </StepContainer>
        </TopContainer>
        <MiddleContainer>
          <div className="title">
            <Title fontSize="22px" fontWeight="400">
              약관동의
            </Title>
          </div>
          <div className="check-container">
            <div className="front">
              <input onChange={() => clickCheck(0)} type="checkbox" />
              <p className="red">(필수) </p>만 18세 이상입니다.
            </div>
          </div>
          <div className="check-container">
            <div className="front">
              <input onChange={() => clickCheck(1)} type="checkbox" />
              <p className="red">(필수) </p>
              서비스 이용약관 동의
            </div>
            <div onClick={() => clickDetail(0)} className="detail red">
              {detail[0] ? "닫기" : "자세히"}
            </div>
          </div>
          {detail[0] ? <Term pos={0} /> : null}
          <div className="check-container">
            <div className="front">
              <input onChange={() => clickCheck(2)} type="checkbox" />
              <p className="red">(필수) </p>
              개인정보 수집 동의
            </div>
            <div onClick={() => clickDetail(1)} className="detail red">
              {detail[1] ? "닫기" : "자세히"}
            </div>
          </div>
          {detail[1] ? <Term pos={1} /> : null}
          <div className="check-container">
            <div className="front">
              <input onChange={() => clickCheck(3)} type="checkbox" />
              <p className="red">(필수) </p>
              전자금융거래 이용약관 동의
            </div>
            <div onClick={() => clickDetail(2)} className="detail red">
              {detail[2] ? "닫기" : "자세히"}
            </div>
          </div>
          {detail[2] ? <Term pos={2} /> : null}
        </MiddleContainer>
        <BottomContainer>
          <ButtonLight width="150px" height="45px" fontSize="18px" borderRadious="2px" onClick={onClickToSelection}>
            이전
          </ButtonLight>
          <ButtonDark width="150px" height="45px" fontSize="18px" borderRadious="2px" onClick={onClickNext}>
            다음
          </ButtonDark>
        </BottomContainer>
      </TermContainer>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.fontColor};
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 20px;
`;
const TermContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 50px;
  width: 700px;
  padding-bottom: 60px;
  position: absolute;
  top: 15%;
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
  gap: 20px;
  /* border-bottom: 1px solid #434242; */
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
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
  width: 100%;
  .title {
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #434242;
  }
  .check-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .front {
      ${({ theme }) => theme.common.flexCenterRow};
    }
    .red {
      color: #a84448;
      margin-right: 5px;
    }
    .detail {
      float: right;
      font-size: 14px;
      cursor: pointer;
    }
  }
  input {
    width: 20px;
    height: 20px;
  }
`;

export default SignupTerm;
