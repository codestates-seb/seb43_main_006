import styled, { css } from "styled-components";
import { ReactComponent as Mainlogo } from "../../assets/images/Logo.svg";
import { useRef, useEffect, useState } from "react";
import { useHover } from "usehooks-ts";
import Headerback from "../../assets/images/Headerback.png";

interface IHeaderContainerProps {
  hovering: string;
  y: number;
}
interface ScrollState {
  x: number;
  y: number;
}

const WhiteMainlogo = styled(Mainlogo)<IHeaderContainerProps>`
  path {
    ${({ hovering, y }) =>
      y > 1
        ? css`
            fill: #222222;
          `
        : css`
            fill: ${hovering === "true" ? "#222222" : "#ffe4e1"};
            transition: all 0.5s ease-out;
          `}
  }
`;

const StyledList = styled.li<IHeaderContainerProps>`
  transition: all 0.3s ease-out;
  display: ${({ hovering }) => (hovering === "true" ? "flex" : "none")};
`;

const HeaderContainer = styled.header<IHeaderContainerProps>`
  width: 100%;
  position: fixed;
  max-width: 1440px;
  transition: all 0.5s ease;
  opacity: 0.8;
  z-index: 999;

  ${({ hovering, y }) =>
    y > 0 || hovering === "true"
      ? css`
          height: 150px;
          color: #222222;
          background-image: url(${Headerback});
          opacity: 0.8;
        `
      : css`
          height: 0px;
          color: #ffe4e1;
          background-image: none;
          opacity: 1;
        `}
`;

const LogoContainer = styled.div<IHeaderContainerProps>`
  display: flex;
  align-items: flex-start;
  position: absolute;
  max-height: 30px;
  top: 6px;
  left: 100px;
`;

const Ulist = styled.div`
  display: flex;
  position: absolute;
  padding-left: 300px;
  justify-content: center;
  width: 1300px;

  & ul {
    padding-left: 40px;
    padding-top: 10px;
    font-size: 22px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    font-weight: bold;
  }

  & ul {
    & li {
      padding-top: 5px;
      font-size: 18px;
      font-weight: 400;
      flex-direction: row;
    }
  }
  .banner1 {
    padding-left: 60px;
  }
  .banner2 {
    padding-left: 25px;
  }
  & div {
    padding-left: 50px;
    width: 50px;
    display: flex;
    flex-direction: row;
    & * {
      padding-left: 100px;
    }
  }
  .banner3 {
    padding-left: 0px;
  }
  .banner4 {
    padding-left: 0px;
  }
  .banner5 {
    padding-left: 0px;
  }
  .banner6 {
    padding-left: 100px;
    font-size: 16px;
  }
`;

const Header = () => {
  const hoverRef = useRef(null);

  const isHover = useHover(hoverRef);

  const useScroll = (): ScrollState => {
    const [state, setState] = useState<ScrollState>({ x: 0, y: 0 });

    const onScroll = (): void => {
      setState({ x: window.scrollX, y: window.scrollY });
    };
    useEffect(() => {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return state;
  };
  const { y } = useScroll();

  return (
    <HeaderContainer hovering={(isHover || false).toString()} y={y}>
      <nav>
        <div ref={hoverRef} className="hoverlayer">
          <LogoContainer hovering={(isHover || false).toString()} y={y}>
            <WhiteMainlogo className="mainlogo" hovering={(isHover || false).toString()} y={y} />
            <Ulist>
              <ul className="banner1">
                List
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  주류 리스트
                </StyledList>
              </ul>
              <ul className="banner2">
                Order
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  찜
                </StyledList>
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  픽업 장소 조회
                </StyledList>
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  장바구니
                </StyledList>
              </ul>
              <ul className="banner3">
                My Page
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  주문 내역
                </StyledList>
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  지난 구매 내역
                </StyledList>
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  개인 정보 수정
                </StyledList>
              </ul>
              <ul className="banner4">
                고객센터
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  자주 묻는 질문
                </StyledList>
                <StyledList hovering={(isHover || false).toString()} y={y}>
                  회원 탈퇴
                </StyledList>
              </ul>
              <ul className="banner5">Search</ul>
              <ul className="banner6">로그인</ul>
            </Ulist>
          </LogoContainer>
        </div>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
