import styled from "styled-components";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosAll from "@hooks/useAxiosAll";
// components
import { ButtonDark, ButtonLight } from "@components/Common/Button";
import Alert from "@components/Common/AlertModal";

type TitleProps = {
  fontSize: string;
  fontWeight: string;
};

const FindPassword = () => {
  const navigate = useNavigate();
  // 전화번호, 이름, 이메일, 알람 메시지, 알람 여부, axios 관련 상태
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [doAxios, , err, ok] = useAxiosAll();

  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 전화번호 000-0000-0000 형식으로 숫자만 입력되도록 함
    const val = e.target.value.replace(/[^\d]/g, "").match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
    if (val) {
      setPhone(
        !val[2] ? val[1] : val[3] ? `${val[1]}-${val[2]}-${val[3]}` : val[2] ? `${val[1]}-${val[2]}` : `${val[1]}`,
      );
    }
  };
  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 이름 onchange 핸들러
    setName(e.target.value);
  };
  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // 이메일 onchange 핸들러
    setEmail(e.target.value);
  };
  const findPasswordHandler = () => {
    // 비밀번호 찾기 요청 onclick
    const body = {
      name,
      phone,
      email,
    };
    doAxios("post", "/members/find-password", body, false);
  };
  useEffect(() => {
    if (err) {
      // 요청 실패시
      setAlertMessage("해당 정보로 가입된 회원정보가 없습니다!");
      setShowAlert(true);
    }
  }, [err]);
  useEffect(() => {
    if (ok) {
      // 요청 성공시
      setAlertMessage("해당 이메일로 임시 비밀번호를 발급했습니다!");
      setShowAlert(true);
    }
  }, [ok]);
  return (
    <Container>
      {showAlert ? <Alert text={alertMessage} onClickOk={() => setShowAlert(false)} /> : null}
      <ContentsContainer>
        <TopContainer>
          <Title className="label" fontSize="28px" fontWeight="500">
            비밀번호 찾기
          </Title>
        </TopContainer>
        <MiddleContainer>
          <InputContainer>
            <Title fontSize="22px" fontWeight="400">
              회원 비밀번호 찾기
            </Title>
            <div className="flex-row">
              <div className="flex-col">
                <input placeholder="이름" type="text" onChange={nameHandler} />
                <input placeholder="이메일" type="email" onChange={emailHandler} />
                <input value={phone} placeholder="전화번호" onChange={phoneHandler} />
              </div>
              <div className="button">
                <ButtonDark width="100%" height="100%" fontSize="18px" fontWeight="500" onClick={findPasswordHandler}>
                  비밀번호 찾기
                </ButtonDark>
              </div>
            </div>
          </InputContainer>
          <Contour />
          <BottomContainer>
            <ButtonLight width="150px" height="45px" fontSize="18px" onClick={() => navigate("/findemail")}>
              이메일찾기
            </ButtonLight>
            <ButtonDark width="150px" height="45px" fontSize="18px" onClick={() => navigate("/login")}>
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
  @media screen and (max-width: 768px) {
    .label {
      display: none;
    }
  }
`;
const ContentsContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 50px;
  max-width: 600px;
  width: 100%;
  padding: 0 25px;
  padding-bottom: 60px;
  position: absolute;
  top: 25%;
  @media screen and (max-width: 768px) {
    top: 15%;
  }
`;
const Title = styled.div<TitleProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
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
  @media screen and (max-width: 768px) {
    background-color: inherit;
    border: none;
    padding: 0;
  }
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
      @media screen and (max-width: 768px) {
        font-size: 14px;
      }
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
      width: 35%;
    }
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

export default FindPassword;
