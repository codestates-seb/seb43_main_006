//개인정보수정 페이지이다.  회원탈퇴기능 안에 포함되어있음.
import React, { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//hooks
import useAxiosAll from "@hooks/useAxiosAll";
//components
import Alert from "@components/Common/AlertModal";

type TableProsp = {
  setBody: React.Dispatch<React.SetStateAction<Bodytype>>;
  userInfo: Datatype | null;
  isOauth: boolean;
};

const InfoTable = ({ setBody, userInfo, isOauth }: TableProsp) => {
  const subTitle = ["이름", "닉네임", "생년월일", "전화번호", "이메일"];
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isDisabled, setIsDisabled] = useState(true); // 비밀번호 형식대로 입력 확인후 비밀번호 확인 란 활성화
  useEffect(() => {
    if (userInfo) {
      setPhone(userInfo.phone);
      setDisplayName(userInfo.displayName);
    }
  }, [userInfo]);
  useEffect(() => {
    if (setBody) {
      setBody({ phone, displayName, password, passwordCheck });
    }
  }, [phone, displayName, password, passwordCheck]);

  const handleDisplay = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
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
  const handlePasswordCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  return (
    <StyledTable>
      <tbody>
        {userInfo === null
          ? null
          : Object.keys(userInfo).map((key, idx) => {
              if (idx > 5) return null;
              return (
                <tr key={idx}>
                  <StyledTh>{subTitle[idx]}</StyledTh>
                  {key === "displayName" || key === "phone" ? (
                    <StyledTd>
                      <input
                        value={key === "phone" ? phone : displayName}
                        onChange={key === "phone" ? handlePhone : handleDisplay}
                      ></input>
                    </StyledTd>
                  ) : (
                    <StyledTd>{userInfo[key as keyof Datatype]}</StyledTd>
                  )}
                </tr>
              );
            })}
        {isOauth ? null : (
          <>
            <tr>
              <StyledTh>비밀번호</StyledTh>
              <StyledTd>
                <input onChange={handlePassword} type="password" placeholder="비밀번호를 입력하세요"></input>
              </StyledTd>
            </tr>
            <tr>
              <StyledTh>비밀번호확인</StyledTh>
              <StyledTd>
                <input
                  disabled={isDisabled}
                  onChange={handlePasswordCheck}
                  type="password"
                  placeholder="비밀번호를 먼저 옳바르게 입력하세요"
                ></input>
              </StyledTd>
            </tr>
          </>
        )}
      </tbody>
    </StyledTable>
  );
};

const TotalStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
`;

const InfoContainer = styled.div`
  /* border: 5px solid black; */
  width: 100vw;
  height: 100vh;
  max-width: 1250px;
  margin-top: 150px; //호버됬을때가 150이래서 일단 150으로 설정함.
  > p {
    margin-left: 30px;
    font-size: 18px;
  }
`;

//테이블 전체부분
const InfoBodyupStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  input {
    font-size: 16px;
    padding: 10px;
    width: 80%;
  }
`;
//테이블밑의 버튼들 전체부분
const InfoBodydownStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 300px;
  margin-top: 30px;
`;

//정보수정버튼
const ChangebtnStyled = styled.button`
  background-color: #222222;
  height: 52px;
  width: 350px;
  color: whitesmoke;
  font-size: 20px;
  border-radius: 7px;
`;

//테이블부분 따로준거, 딱테이블부분!
const StyledTable = styled.table`
  border: 2px solid #dedede;
  width: 800px;
  height: 900px;
  text-align: center;
  /* vertical-align: middle; */
  font-size: 16px;
  /* margin-left: 100px; */
`;
const StyledTd = styled.td`
  border: 1px solid black;
  vertical-align: middle;
  /* background-color: red; */
`;
const StyledTh = styled.th`
  border: 1px solid black;
  vertical-align: middle;
  text-align: left;
  padding-left: 20px;
  font-weight: 600;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const ModalBtn = styled.button`
  //회원탈퇴버튼
  background-color: #f7f7f7;
  height: 52px;
  width: 120px;
  border-radius: 7px;
  border: 1px solid #181818;
  font-size: 20px;
  font-weight: 350;
  margin-right: 40px;
`;
//모달뜰때 뒤배경
const ModalBackdrop = styled.div`
  background-color: whitesmoke;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;
//회원탈퇴클릭시 뜨는 모달창
const ModalView = styled.div`
  background-color: #dedede;
  border-radius: 7px;
  width: 600px;
  height: 300px;
  position: fixed;
  /* transform: translateY(-100px);
  transform: translateX(-200px); */
  transform: translateY(-200px);
  transform: translateX(-300px);
  left: 50%;
  top: 35%;
  //display: flex;
  // flex-direction: column;
  // justify-content: center;
  /* > p {
    border: 2px solid black;
    top: 50%;
  } */
  text-align: center;
  padding-top: 50px;
  > p {
    font-size: 20px;
    font-weight: 500;
    display: block;
  }
  .password-container {
    ${({ theme }) => theme.common.flexCenterRow};
  }
  input {
    margin: 30px;
    border: 1px solid #b2b2b2;
    padding: 5px 10px;
    font-size: 16px;
    width: 50%;
  }
`;

//모달창에 있는 yes, no버튼들
const CloseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  /* margin-left: 180px; */
  /* margin-left: 30%; */
  gap: 70px;
  cursor: pointer;
  /* background-color: #222222; */
`;

//모달창열렸을때 X버튼
const WindowCloseBtn = styled.div`
  /* border: 2px solid blue; */
  float: right;
  margin-right: 10px;
  cursor: pointer;
`;

const ModalCloseBtn = styled.div`
  border: 2px solid #181818;
  height: 52px;
  width: 80px;
  border-radius: 7px;
  /* display: flex;
  flex-direction: row; */
  line-height: 100%;
  font-size: 20px;
  padding-top: 10px;
  color: #181818;
  font-weight: 700;
  cursor: pointer;
`;

const Modal = ({ email }: { email: string }) => {
  const [isOpen, setIsOpen] = useState(false); //false를 모달 닫힌걸로 생각함.
  const [password, setPassword] = useState("");
  const [doAxios, data, err, ok] = useAxiosAll();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const navigate = useNavigate();
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const DeleteHandler = () => {
    console.log(email, password);
    doAxios("delete", "/members", { username: email, password });
  };
  useEffect(() => {
    if (err) {
      setAlertMessage("비밀번호가 틀렸습니다");
      setShowAlert(true);
    }
  }, [err]);
  useEffect(() => {
    if (ok) {
      setAlertMessage("탈퇴에 성공했습니다!");
      setShowAlert(true);
      setIsOk(true);
    }
  }, [ok]);
  const okGotoMain = () => {
    // 회원가입 성공시 알림창 확인 onClick 핸들러
    setShowAlert(false);
    navigate("/");
  };
  return (
    <>
      <ModalContainer>
        {showAlert ? <Alert text={alertMessage} onClickOk={isOk ? okGotoMain : () => setShowAlert(false)} /> : null}
        <ModalBtn onClick={openModalHandler}>회원탈퇴</ModalBtn>
        {isOpen ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView onClick={(event) => event.stopPropagation()}>
              <WindowCloseBtn onClick={openModalHandler}>X</WindowCloseBtn>
              <div className="password-container">
                비밀번호
                <input type="password" onChange={passwordHandler}></input>
              </div>
              <p>정말로 탈퇴하시겠습니까?</p>
              <CloseBtn>
                <ModalCloseBtn onClick={DeleteHandler}>YES</ModalCloseBtn>
                <ModalCloseBtn onClick={() => navigate("/mypage/likepage")}>NO</ModalCloseBtn>
              </CloseBtn>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
type Datatype = {
  realName: string;
  displayName: string;
  birth: string;
  phone: string;
  email: string;
};
type Bodytype = {
  displayName: string;
  phone: string;
  password: string;
  passwordCheck: string;
};

const Changeinfopage = () => {
  const navigate = useNavigate();
  const [doAxios, data, err] = useAxiosAll();
  const [body, setBody] = useState<Bodytype>({
    displayName: "",
    phone: "",
    password: "",
    passwordCheck: "",
  });
  const [userInfo, setUserInfo] = useState<Datatype | null>(null);
  const [isOauth, setIsOauth] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isOk, setIsOk] = useState(false);
  useEffect(() => {
    if (err) {
      setAlertMessage("로그인 후 접근해주세요!");
      setShowAlert(true);
    }
  }, [err]);
  useEffect(() => {
    if (
      "oauth2Registered" in data &&
      "realName" in data &&
      "displayName" in data &&
      "birthDate" in data &&
      "phone" in data &&
      "email" in data
    ) {
      if (data.oauth2Registered) {
        setIsOauth(true);
      }
      const formData = {
        realName: data.realName,
        displayName: data.displayName,
        birth: data.birthDate,
        phone: data.phone,
        email: data.email,
      };
      setUserInfo(formData as Datatype);
    }
  }, [data]);

  useEffect(() => {
    doAxios("get", "/members", {}, true);
  }, []);
  const patchOnclick = () => {
    console.log(body);

    if (body && body.password) {
      if (body.password === body.passwordCheck) {
        doAxios("patch", "/members", body, true);
        setAlertMessage("정보수정을 성공했습니다!");
        setShowAlert(true);
        setIsOk(true);
      } else {
        setAlertMessage("비밀번호와 비밀번호 확인이 일치 않거나 정보가 모두 기입되지 않았습니다!");
        setShowAlert(true);
      }
    } else {
      doAxios("patch", "/members", { displayName: body?.displayName, phone: body?.phone }, true);
      setAlertMessage("정보수정을 성공했습니다!");
      setShowAlert(true);
      setIsOk(true);
    }
  };
  const okGotoMain = () => {
    // 수정 성공시 알림창 확인 onClick 핸들러
    setShowAlert(false);
    navigate("/");
  };
  return (
    <>
      <TotalStyled>
        {showAlert ? <Alert text={alertMessage} onClickOk={isOk ? okGotoMain : () => setShowAlert(false)} /> : null}
        <InfoContainer>
          <p>회원정보수정</p>
          <InfoBodyupStyled>
            <InfoTable setBody={setBody} userInfo={userInfo} isOauth={isOauth}></InfoTable>
          </InfoBodyupStyled>
          <InfoBodydownStyled>
            <ChangebtnStyled onClick={patchOnclick}>정보 수정</ChangebtnStyled>
            {userInfo ? <Modal email={userInfo.email}></Modal> : null}
          </InfoBodydownStyled>
        </InfoContainer>
      </TotalStyled>
    </>
  );
};

export default Changeinfopage;
