import styled from "styled-components";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//components
import { ButtonDark, ButtonLight } from "@components/Common/Button";
import Alert from "@components/Common/AlertModal";
import useAxiosAll from "@hooks/useAxiosAll";

type TitleProps = {
  fontSize: string;
  fontWeight: string;
};

const FindEmail = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState(""); // 전화번호 input 상태
  const [name, setName] = useState(""); // 이름 input 상태
  const [alertMessage, setAlertMessage] = useState(""); // 알람창 메시지 상태
  const [showAlert, setShowAlert] = useState(false); // 알람창 띄우기 상태
  const [isFind, setIsFind] = useState(""); // 찾은 이메일 상태
  const [doAxios, data, err, ok] = useAxiosAll(); // axios 요청 응답 에러여부 상태

  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 전환번호 입력 핸들러
    //전환번호 양식대로 입력 작성되도록 유효성 검사 실시
    const val = e.target.value.replace(/[^\d]/g, "").match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
    if (val) {
      setPhone(
        !val[2] ? val[1] : val[3] ? `${val[1]}-${val[2]}-${val[3]}` : val[2] ? `${val[1]}-${val[2]}` : `${val[1]}`,
      );
    }
  };
  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 이름 입력 핸들러
    setName(e.target.value);
  };
  useEffect(() => {
    if (err) {
      //에러 실패 시
      setAlertMessage("이름과 전화번호에 해당하는 이메일이 없습니다!");
      setShowAlert(true);
    }
  }, [err]);
  useEffect(() => {
    if (ok) {
      // 이메일 찾기 성공 시
      setAlertMessage("이메일을 찾았습니다!");
      setShowAlert(true);
    }
  }, [ok]);
  useEffect(() => {
    if (data && "email" in data) {
      // data 상태에 정상 저장 되었을 시
      // 받은 이메일을 marked 처리해 저장
      const email = data.email as string;
      const half = email.indexOf("@");
      const front = email.slice(0, Math.ceil(half / 2));
      const masked = Array(Math.floor(half / 2))
        .fill("*")
        .join("");
      setAlertMessage("이메일을 찾았습니다!");
      setShowAlert(true);
      setIsFind(`${front}${masked}${email.slice(Math.ceil(half))}`);
    }
  }, [data]);
  const findEmailHandler = () => {
    // 이메일 찾기 핸들러
    const body = {
      name,
      phone,
    };
    doAxios("post", "/members/find-id", body, false); // post매소드로 이름과 번호를 담아 이메일 찾기 요청 실시
  };
  return (
    <Container>
      {showAlert ? <Alert text={alertMessage} onClickOk={() => setShowAlert(false)} /> : null}
      <ContentsContainer>
        <TopContainer>
          <Title fontSize="28px" fontWeight="500">
            이메일 찾기
          </Title>
        </TopContainer>
        <MiddleContainer>
          <InputContainer>
            <Title fontSize="22px" fontWeight="400">
              회원 이메일 찾기
            </Title>
            <div className="flex-row">
              <div className="flex-col">
                <input placeholder="이름" type="text" onChange={nameHandler} />
                <input value={phone} placeholder="전화번호" onChange={phoneHandler} />
              </div>
              <div className="button">
                <ButtonDark width="100%" height="100%" fontSize="18px" fontWeight="500" onClick={findEmailHandler}>
                  이메일 찾기
                </ButtonDark>
              </div>
            </div>
          </InputContainer>
          {isFind ? (
            <>
              <Contour />
              <div>
                가입된 이메일<div className="found">{isFind}</div>
              </div>
            </>
          ) : null}
          <Contour />
          <BottomContainer>
            <ButtonLight
              width="150px"
              height="45px"
              fontSize="18px"
              borderRadious="2px"
              border="solid 1px lightgray"
              onClick={() => navigate("/findpassword")}
            >
              비밀번호찾기
            </ButtonLight>
            <ButtonDark
              width="150px"
              height="45px"
              fontSize="18px"
              borderRadious="2px"
              onClick={() => navigate("/login")}
            >
              로그인하기
            </ButtonDark>
          </BottomContainer>
        </MiddleContainer>
      </ContentsContainer>
    </Container>
  );
};

const Container = styled.div`
  color: ${({ theme }) => theme.colors.fontColor};
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 20px;
`;
const ContentsContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 50px;
  width: 600px;
  position: absolute;
  top: 25%;
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
`;
const MiddleContainer = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
  gap: 30px;
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
  }
  .found {
    margin-top: 15px;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 30px;
  width: 100%;
  margin-bottom: 10px;
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
    gap: 30px;
    width: 100%;
    height: 100%;
  }
  .button {
    width: 30%;
  }
`;
const Contour = styled.hr`
  width: 100%;
  border-color: #eee;
`;
const BottomContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.common.flexCenterRow}
  gap: 15px;
`;

export default FindEmail;
