import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ButtonDark, ButtonLight } from "../../components/Common/Button";
import Alert from "../../components/Common/AlertModal";

const url = "https://27b9-124-111-225-247.ngrok-free.app/";
type StepProps = {
  type: string;
};
type TitleProps = {
  fontSize: string;
  fontWeight: string;
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

const FindEmail = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isFind, setIsFind] = useState("");

  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d]/g, "").match(/(\d{0,3})(\d{0,4})(\d{0,4})/);
    if (val) {
      setPhone(
        !val[2] ? val[1] : val[3] ? `${val[1]}-${val[2]}-${val[3]}` : val[2] ? `${val[1]}-${val[2]}` : `${val[1]}`,
      );
    }
  };
  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const findEmailHandler = () => {
    const body = {
      name,
      phone,
    };
    console.log(body);
    axios
      .post(`${url}members/find-id`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const email = res.data.data.email;
        const half = email.indexOf("@");
        const front = email.slice(0, Math.ceil(half / 2));
        const masked = Array(Math.floor(half / 2))
          .fill("*")
          .join("");
        console.log(`${front}${masked}`);
        setAlertMessage("이메일을 찾았습니다!");
        setShowAlert(true);
        setIsFind(`${front}${masked}${email.slice(Math.ceil(half))}`);
      })
      .catch((err) => {
        console.log(err);
        setAlertMessage("이름과 전화번호에 해당하는 이메일이 없습니다!");
        setShowAlert(true);
      });
  };
  return (
    <Container>
      {showAlert ? <Alert text={alertMessage} onClick={() => setShowAlert(false)} /> : null}
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
export default FindEmail;
