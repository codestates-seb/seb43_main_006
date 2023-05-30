import styled from "styled-components";
import { UserProps } from "../../types/AlcholInterfaces";
import { memo } from "react";

export interface ChildComponentProps {
  userInfo: UserProps;
  updateUserInfo: (user: UserdataType) => void;
}
export type UserdataType = {
  memberId: string;
  displayName: string;
  realName: string;
  phone: string;
  email: string;
};
function PaymnetUserInfo({ userInfo }: ChildComponentProps) {
  return (
    <BuyerInfo>
      <div className="userinfo">
        <div className="buyerinfo">
          <div className="title">구매자 정보</div>
          <div className="buyername">
            <div className="buyer">이름 </div>
            <div className="username">{userInfo.realName}</div>
          </div>
          <div className="buyeremail">
            <div className="email">이메일 </div>
            <div className="useremail">{userInfo.email}</div>
          </div>
          <div className="buyerphoneNumber">
            <div className="phone">전화번호 </div>
            <div className="userphone">{userInfo.phone}</div>
          </div>
        </div>
      </div>
    </BuyerInfo>
  );
}

export default memo(PaymnetUserInfo);

const BuyerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.common.flexCenterCol};
  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
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
    border-bottom: 1px solid rgba(60, 60, 60, 0.05);
  }
  & div.buyer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    width: 13%;
    padding-right: 2%;
    border-right: 1px solid rgba(60, 60, 60, 0.5);
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
  & div.email {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    width: 13%;
    padding-right: 2%;
    border-right: 1px solid rgba(60, 60, 60, 0.5);
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
  & div.phone {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 18px;
    width: 13%;
    padding-right: 2%;
    border-right: 1px solid rgba(60, 60, 60, 0.5);
    @media screen and (max-width: 767px) {
      font-size: 12px;
      width: 13.3%;
      padding-right: 0%;
    }
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
