import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
type TypeProps = {
  type: string;
};

const Container = styled.div`
  margin-top: 60px;
  height: 100vh;
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 20px;
  .go-login {
    ${({ theme }) => theme.common.flexCenterRow};
    gap: 10px;
    font-size: 14px;
    color: #b2b2b2;
  }
  .click-to-login {
    color: ${({ theme }) => theme.colors.themeColor};
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;
const SelectionContainer = styled.div`
  color: white;
  padding: 60px 70px;
  width: 600px;
  ${({ theme }) => theme.common.flexCenterCol};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  gap: 20px;
  background-color: white;
`;
const BasicSignupBox = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  width: 100%;
  padding: 25px 0px;
  height: 65px;
  background-color: ${({ theme }) => theme.colors.themeColor};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  cursor: pointer;
`;
const Contour = styled.hr`
  width: 100%;
  border-color: ${({ theme }) => theme.colors.border};
`;

const OAuthSignUpBox = styled.div<TypeProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ type }) => (type === "google" ? "white" : "#4566a0")};
  color: ${({ type }) => (type === "google" ? "black" : "white")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  .desc {
    font-size: 22px;
    width: calc(100% - 65px);
    text-align: center;
  }
  border-radius: 2px;
  cursor: pointer;
`;
const OAuthIconContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  height: 65px;
  width: 65px;
  padding: 5px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  .icon {
    width: 35px;
  }
`;
const SignupSelection = () => {
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
  };
  const toSignTerm = () => {
    navigate("/signup/term");
  };
  return (
    <Container>
      <SelectionContainer>
        <BasicSignupBox onClick={toSignTerm}>쇼핑몰 회원가입</BasicSignupBox>
        <Contour />
        <OAuthSignUpBox onClick={toSignTerm} type="google">
          <OAuthIconContainer>
            <FcGoogle size="50" color="black" />
          </OAuthIconContainer>
          <div className="desc">구글 아이디 회원가입</div>
        </OAuthSignUpBox>
        <OAuthSignUpBox onClick={toSignTerm} type="facebook">
          <OAuthIconContainer>
            <TiSocialFacebook size="50" color="white" />
          </OAuthIconContainer>
          <div className="desc">페이스북 아이디 회원가입</div>
        </OAuthSignUpBox>
      </SelectionContainer>
      <div className="go-login">
        이미 회원이신가요?
        <div onClick={toLogin} className="click-to-login">
          로그인
        </div>
      </div>
    </Container>
  );
};
export default SignupSelection;
