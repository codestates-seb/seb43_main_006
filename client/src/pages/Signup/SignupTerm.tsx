import styled, { ThemeContext } from "styled-components";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { ButtonDark, ButtonLight } from "../../components/Common/Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Common/AlertModal";
// 05110209
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
const TermContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterCol};
  gap: 50px;
  width: 700px;
  padding-bottom: 60px;
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

const TermDetail = styled.div`
  height: 200px;
  width: 100%;
  padding: 20px;
  background-color: white;
  font-size: 14px;
  color: gray;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  white-space: pre-wrap;
  overflow: scroll;
`;
const BottomContainer = styled.div`
  ${({ theme }) => theme.common.flexCenterRow}
  gap: 15px;
`;

const SignupTerm = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState([false, false, false]);
  const [isNext, setIsNext] = useState(false);
  const [isAgreed, setIsAgreed] = useState([false, false, false, false]);

  const themeContext = useContext(ThemeContext).colors;
  const detailData = [
    `[서비스 이용약관 동의서]

제1조 (목적)

본 약관은 매주매주 (이하 "회사")가 제공하는 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
  
제2조 (정의)
  
1. "서비스"라 함은 회사가 제공하는 인터넷 서비스를 의미합니다.
2. "이용자"라 함은 서비스를 이용하는 개인 또는 법인을 말합니다.

제3조 (이용계약의 체결)
  
1. 이용계약은 이용자가 본 약관에 동의하고 회원가입 신청을 한 후, 회사가 이를 승낙함으로써 체결됩니다.
2. 이용계약의 체결시기는 회사가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.
3. 회사는 이용자의 신청에 대해 회원가입을 승낙하기 전에 필요한 경우, 추가적인 서류를 요구할 수 있습니다.
  
제4조 (서비스의 제공 및 변경)
  
1. 회사는 이용자에게 서비스를 제공합니다.
2. 회사는 서비스의 내용, 이용 방법, 이용 시간 등을 변경할 수 있으며, 변경된 내용은 회사의 웹사이트에 게시함으로써 이용자에게 공지합니다.
  
제5조 (서비스의 이용)
  
1. 이용자는 서비스를 이용할 때, 관계법령 및 본 약관을 준수하여야 합니다.
2. 이용자는 회사의 서비스를 이용함에 있어서, 다음 각 호의 행위를 하여서는 안 됩니다.
  
    1. 타인의 정보도용
    2. 회사의 서비스 운영을 방해하는 행위
    3. 회사의 서비스에 게시된 정보를 변경하는 행위
    4. 회사의 지적재산권을 침해하는 행위
  
제6조 (계약해지 및 이용제한)
  
1. 이용자는 언제든지 서비스 이용을 중단하고, 이용계약 해지를 요청할 수 있습니다.
2. 회사는 이용자가 본 약관에서 금지하는 행위를 한 경우, 이용계약을 해지하거나 이용을 제한할 수 있습니다.`,
    `
[개인정보 수집 및 이용 동의서]

제1조 (목적)

본 약관은 주식회사 매주매주(이하 "회사")가 제공하는 서비스와 관련하여 회사가 이용자의 개인정보를 수집, 이용하는 것에 대해 동의함을 목적으로 합니다.

제2조 (수집하는 개인정보 항목)

1. 회사는 다음과 같은 개인정보를 수집합니다.

    1 .수집항목 : 성명, 생년월일, 주소, 연락처, 이메일 주소 등
    2. 수집방법 : 회원가입 시, 서비스 이용 중 수집

제3조 (개인정보의 수집 및 이용목적)

1.회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.

    1.회원 가입 및 관리 : 회원가입 의사 확인, 회원제 서비스 이용에 따른 본인확인, 회원 정보 변경 등을 위하여 개인정보를 이용합니다.
    2.서비스 제공 : 서비스 제공에 따른 본인확인, 불만처리 등을 위하여 개인정보를 이용합니다.

제4조 (개인정보의 보유 및 이용기간)

1. 회사는 이용자가 회원 탈퇴를 요청하거나 개인정보 이용목적이 달성된 후에는 해당 개인정보를 지체 없이 파기합니다.
2. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.

    1. 보존항목 : 성명, 생년월일, 주소, 연락처, 이메일 주소, 계좌번호
    2. 보존근거 : 회사 내부 방침에 의한 정보보유
    3. 보존기간 : 회사 내부 방침에 따라 보존 (단, 회원탈퇴 후 3개월 이내 파기)

제5조 (개인정보의 파기절차 및 방법)

1. 회사는 이용자의 개인정보 이용목적이 달성된 후에는 해당 개인정보를 지체 없이 파기합니다.
2. 파기절차는 다음과 같습니다.

    1. 파기절차 : 회원 탈퇴 시 즉시 파기, 서면 요청 시 파기
    2. 파기방법 : 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
`,
    `
[전자금융 거래 이용약관 동의서]

제1조 (목적)
본 약관은 매주매주 (이하 "회사")이 제공하는 전자금융거래서비스(이하 "서비스")와 관련하여 회사와 고객(이하 "이용자")간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)

1. "서비스"라 함은 회사가 제공하는 전자금융거래서비스를 말합니다.
2. "이용자"라 함은 서비스를 이용하는 개인 또는 법인을 말합니다.
3. "전자금융거래"라 함은 전자적 방법으로 수행되는 금융거래를 말합니다.

제3조 (이용계약의 체결)

1. 이용계약은 이용자가 본 약관에 동의하고 회원가입 신청을 한 후, 회사가 이를 승낙함으로써 체결됩니다.
2. 이용계약의 체결시기는 회사가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.
3. 회사는 이용자의 신청에 대해 회원가입을 승낙하기 전에 필요한 경우, 추가적인 서류를 요구할 수 있습니다.

제4조 (서비스 이용)

1. 이용자는 서비스를 이용하고자 하는 경우, 본 약관에 동의해야 합니다.
2. 이용자는 서비스를 이용함에 있어, 다음 각 호의 행위를 하여서는 안 됩니다.

    1. 서비스를 이용하여 법령, 회사의 약관 또는 공공질서, 미풍양속 등에 반하는 행위를 하는 경우
    2. 타인의 정보를 도용하는 경우
    3. 회사의 서비스 운영을 방해하는 경우
    4. 회사의 지적재산권을 침해하는 경우

3. 회사는 이용자가 본 약관에서 금지하는 행위를 한 경우, 이용계약을 해지하거나 이용을 제한할 수 있습니다.

제5조 (수수료)

1.서비스 이용에 대한 수수료는 회사가 별도로 정한 바에 따릅니다.
`,
  ];
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
    console.log(isAgreed);
    if (isAgreed[0] && isAgreed[1] && isAgreed[2] && isAgreed[3]) {
      navigate("/signup/input");
    } else {
      setIsNext(true);
    }
  };
  return (
    <Container>
      {isNext ? <Alert text="모든 약관을 동의해 주세요!" onClick={() => setIsNext(false)} /> : null}
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
          {detail[0] ? <TermDetail>{detailData[0]}</TermDetail> : null}
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
          {detail[1] ? <TermDetail>{detailData[1]}</TermDetail> : null}
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
          {detail[2] ? <TermDetail>{detailData[2]}</TermDetail> : null}
        </MiddleContainer>
        <BottomContainer>
          <ButtonLight
            width="150px"
            height="45px"
            fontSize="18px"
            borderRadious="2px"
            border="solid 1px lightgray"
            onClick={() => navigate("/signup")}
          >
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
export default SignupTerm;
