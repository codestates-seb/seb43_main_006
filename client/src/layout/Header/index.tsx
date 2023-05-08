import styled from "styled-components";
import { ReactComponent as Mainlogo } from "../../assets/image/Logo.svg";
import { useRef } from "react";
import { useHover } from "usehooks-ts";

interface IHeaderContainerProps {
  hovering?: boolean;
}

const WhiteMainlogo = styled(Mainlogo)<IHeaderContainerProps>`
  path {
    fill: ${({ hovering }) => (hovering ? "#ab4448" : "#ffe4e1")};
    transition: all 1.5s ease-out;
  }
`;

const StyledList = styled.li<IHeaderContainerProps>`
  font-size: 20px;
  margin-top: 15px;
  transition: all 0.1s ease-out;
  display: ${({ hovering }) => (hovering ? "flex" : "none")};
`;

const HeaderContainer = styled.header<IHeaderContainerProps>`
  height: ${({ hovering }) => (hovering ? "300px" : "135px")};
  width: 100%;
  background: ${({ hovering }) => (hovering ? "rgba(255, 228, 225, 1)" : "none")};
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
  flex-direction: row;
  transition: all 0.5s ease;
  color: ${({ hovering }) => (hovering ? "#22222" : "#ffe4e1")};
  background-color: ${({ hovering }) => (hovering ? "rgba(255, 228, 225, 0.7)" : "transparent")};
`;

const LogoContainer = styled.div<IHeaderContainerProps>`
  display: flex;
  align-items: flex-start;
  position: absolute;
  max-height: 30px;
  top: 40px;
  left: 50px;
`;

const Ulist = styled.div`
  display: flex;
  position: relative;
  padding-left: 100px;
  justify-content: center;

  & ul {
    padding-left: 40px;
    padding-top: 10px;
    font-size: 22px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
  }

  & ul {
    & li {
      font-size: 16px;
    }
  }
  .banner2 {
    padding-left: 25px;
  }
  & p {
    padding-left: 50px;
    width: 50px;
    display: flex;
    flex-direction: row;
    .icon3 {
      padding-left: 150px;
    }
    & * {
      padding-left: 100px;
    }
  }
`;

const Header = () => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  return (
    <HeaderContainer hovering={isHover}>
      <nav>
        <div ref={hoverRef} className="hoverlayer">
          <LogoContainer hovering={isHover}>
            <WhiteMainlogo className="mainlogo" hovering={isHover} />
            <Ulist>
              <ul className="banner1">
                List
                <StyledList hovering={isHover}>List1</StyledList>
                <StyledList hovering={isHover}>List2</StyledList>
                <StyledList hovering={isHover}>List3</StyledList>
                <StyledList hovering={isHover}>List4</StyledList>
                <StyledList hovering={isHover}>List5</StyledList>
              </ul>
              <ul className="banner2">
                My Page
                <StyledList hovering={isHover}>My Page1</StyledList>
                <StyledList hovering={isHover}>My Page2</StyledList>
                <StyledList hovering={isHover}>My Page3</StyledList>
                <StyledList hovering={isHover}>My Page4</StyledList>
                <StyledList hovering={isHover}>My Page5</StyledList>
              </ul>
              <ul className="banner3">
                장바구니
                <StyledList hovering={isHover}>장바구니 정보</StyledList>
                <StyledList hovering={isHover}>Main2</StyledList>
                <StyledList hovering={isHover}>Main3</StyledList>
                <StyledList hovering={isHover}>Main4</StyledList>
                <StyledList hovering={isHover}>Main5</StyledList>
              </ul>
              <p>
                <ul className="icon2"> 2</ul>
                <ul className="icon3"> Menu Bar</ul>
              </p>
            </Ulist>
          </LogoContainer>
        </div>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
