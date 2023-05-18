import styled from "styled-components";
import { useState } from "react";
import { UserProps } from "../../types/AlcholInterfaces";

interface ChildComponentProps {
  userInfo: UserProps;
  updateUserInfo: (user: UserProps) => void;
}

export default function PaymnetUserInfo({ userInfo }: ChildComponentProps) {
  const [user, setUser] = useState<UserProps>(userInfo);
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPhoneEditOpen, setIsPhoneEditOpen] = useState(false);
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);
  const [isEmailEditOpen, setIsEmailEditOpen] = useState(false);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/checkout", { state: user });
  // }, [user, navigate]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNewName(inputValue);
    setUser({
      ...user,
      name: inputValue,
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setNewEmail(inputValue);
    setUser({
      ...user,
      email: inputValue,
    });
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, "").slice(0, 11);
    setNewPhoneNumber(inputValue);
    setErrorMsg(""); // 입력값이 변경될 때마다 오류 메시지 초기화
  };

  const handleNameUpdate = () => {
    setUser({
      ...user,
      name: newName,
    });
    setNewName("");
    setIsNameEditOpen(false);
  };

  const handleEmailUpdate = () => {
    setUser({
      ...user,
      email: newEmail,
    });
    setNewEmail("");
    setIsEmailEditOpen(false);
  };

  const handlePhoneNumberUpdate = () => {
    if (newPhoneNumber.length < 11) {
      setErrorMsg("전화번호는 11자리 이상 입력해주세요."); // 상태값 변경
      return;
    }
    if (!/^010/.test(newPhoneNumber)) {
      setErrorMsg("전화번호는 010으로 시작해야 합니다."); // 상태값 변경
      return;
    }

    setUser({
      ...user,
      phoneNumber: newPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
    });

    setNewPhoneNumber("");
    setIsPhoneEditOpen(false);
  };

  return (
    <BuyerInfo>
      <div className="userinfo">
        <div className="buyerinfo">
          <div className="title">구매자 정보</div>
          <div className="buyername">
            <div className="buyer">이름 </div>
            {isNameEditOpen ? (
              <div className="editName">
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  placeholder="이름을 입력하세요"
                  className="putname"
                />
                <button className="putbutton" onClick={handleNameUpdate}>
                  이름 수정
                </button>
                <button
                  className="putbutton"
                  onClick={() => {
                    setIsNameEditOpen(false);
                    setNewName("");
                  }}
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="username" onClick={() => setIsNameEditOpen(true)}>
                {user.name}
              </div>
            )}
          </div>
          <div className="buyeremail">
            <div className="email">이메일 </div>
            {isEmailEditOpen ? (
              <div className="editEmail">
                <input
                  type="text"
                  value={newEmail}
                  onChange={handleEmailChange}
                  placeholder="이메일을 입력하세요"
                  className="putemail"
                />
                <button className="putbutton" onClick={handleEmailUpdate}>
                  이메일 수정
                </button>
                <button
                  className="putbutton"
                  onClick={() => {
                    setIsEmailEditOpen(false);
                    setNewEmail("");
                  }}
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="useremail" onClick={() => setIsEmailEditOpen(true)}>
                {user.email}
              </div>
            )}
          </div>
          <div className="buyerphoneNumber">
            <div className="phone">휴대폰 번호</div>
            {isPhoneEditOpen ? (
              <div className="editPhone">
                <input
                  type="text"
                  value={newPhoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="숫자만 입력하세요"
                  className="putnumber"
                />
                <div className="errmsg">{errorMsg}</div>
                <button className="putbutton" onClick={handlePhoneNumberUpdate} disabled={newPhoneNumber.length < 11}>
                  전화번호 수정
                </button>
                <button
                  className="putbutton"
                  onClick={() => {
                    setIsPhoneEditOpen(false);
                    setNewPhoneNumber("");
                  }}
                >
                  취소
                </button>
              </div>
            ) : (
              <div className="userphone" onClick={() => setIsPhoneEditOpen(!isPhoneEditOpen)}>
                {user.phoneNumber}
              </div>
            )}
          </div>
        </div>
      </div>
    </BuyerInfo>
  );
}

const BuyerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.common.flexCenterCol};

  & div.userinfo {
    width: 80%;
  }

  & div.title {
    font-size: 30px;
    padding-bottom: 2%;
    padding-top: 5%;
  }

  & div.buyinfo {
    ${({ theme }) => theme.common.flexCenterCol};
    width: 100%;
    height: 500px;
  }

  & div.buyername {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding-top: 1.25%;
    padding-bottom: 1.25%;
    border-bottom: 1px solid rgba(60, 60, 60, 0.05);
  }
  & div.buyeremail {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding-top: 1.25%;
    padding-bottom: 1.25%;
    border-bottom: 1px solid rgba(60, 60, 60, 0.05);
  }
  & div.buyerphoneNumber {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding-top: 1.25%;
    padding-bottom: 1.25%;
  }
  & div.buyer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 18px;
    width: 13%;
    padding-right: 2%;
    border-right: 1px solid rgba(60, 60, 60, 0.5);
  }
  & div.email {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 18px;
    width: 13%;
    padding-right: 2%;
    border-right: 1px solid rgba(60, 60, 60, 0.5);
  }
  & div.phone {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 18px;
    width: 13%;
    padding-right: 2%;
    border-right: 1px solid rgba(60, 60, 60, 0.5);
  }
  & div.username {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 2%;
  }
  & div.useremail {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 2%;
  }
  & div.userphone {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 2%;
  }
  & input.putnumber {
    border-radius: 4%;
    font-size: 16px;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & input.putname {
    border-radius: 4%;
    font-size: 16px;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & input.putemail {
    border-radius: 4%;
    font-size: 16px;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
  & div.errmsg {
    color: red;
    font-size: 14px;
  }
  & div.editopen {
    width: 100%;
    height: 100%;
  }
  & div.editPhone {
    height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    font-size: 16px;
  }
  & div.editName {
    height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    font-size: 16px;
  }
  & div.editEmail {
    height: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    font-size: 16px;
  }

  & button.putbutton {
    border-radius: 4%;
    border: 1px solid rgba(60, 60, 60, 0.1);
  }
`;
