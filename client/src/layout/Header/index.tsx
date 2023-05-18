import styled, { css } from "styled-components";
import { ReactComponent as Mainlogo } from "../../assets/images/Logo.svg";
import { useRef, useEffect, useState } from "react";
import { useHover } from "usehooks-ts";
import Headerback from "../../assets/images/Headerback.png";
import { useLocation, useNavigate } from "react-router-dom";

interface IHeaderContainerProps {
  hovering: string;
  y: number;
  pathname?: string;
}
interface ScrollState {
  x: number;
  y: number;
}

const LogoContainer = styled.header<IHeaderContainerProps>`
  display: flex;
  position: absolute;
  left: 10%;
  width: 100%;
  height: 120px;

  & div.tag {
    padding-top: ${({ hovering }) => (hovering === "true" ? "35px" : "25px")};
    transition: all 0.3s ease-out;
    &:hover {
      cursor: pointer;
    }
  }
`;

const HeaderContainer = styled.div<IHeaderContainerProps>`
  width: 100%;
  position: fixed;
  transition: all 0.3s ease-out;
  z-index: 1;

  ${({ hovering, y, pathname }) =>
    y > 0 || hovering === "true"
      ? css`
          height: 120px;
          color: #222222;
          background-image: url(${Headerback});
          opacity: 0.8;
        `
      : css`
          height: 0px;
          color: rgba(245, 245, 245, 1);
          background-image: none;
          opacity: 1;
          color: ${pathname === "/" ? "rgba(245, 245, 245, 1)" : "#222222"}; rgba(245, 245, 245, 1)" : "color: #222222;"
        `}
`;

const WhiteMainlogo = styled(Mainlogo)<IHeaderContainerProps>`
  path {
    ${({ hovering, y, pathname }) =>
      y > 0 || hovering === "true"
        ? css`
            fill: #222222;
          `
        : css`
         fill: ${pathname === "/" ? "rgba(245, 245, 245, 1)" : "#222222"}; rgba(245, 245, 245, 1)" : "color: #222222;"
          `}

    transition: all 0.5s ease-out;
    &:hover {
      fill: #a84448;
      cursor: pointer;
      transition: all 0.3 ease;
    }
  }
`;
const Ulist = styled.div<IHeaderContainerProps>`
  display: flex;
  position: relative;
  padding-left: 7%;
  justify-content: space-around;
  width: 80%;
  transition: all 0.3s ease-out;

  padding-top: ${({ hovering }) => (hovering === "true" ? "20px" : "30px")};
  & ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    font-size: ${({ hovering }) => (hovering === "true" ? "20px" : "24px")};
    transition: all 0.5s ease-out;
  }

  & ul {
    & li {
      padding-top: 15%;
      font-size: 16px;
      font-weight: 400;
      flex-direction: row;
    }
  }

  .banner1 {
    width: 8%;
  }
  .banner2 {
    width: 8%;
  }

  .banner3 {
    padding-left: 0px;
    width: 8%;
  }
  .banner4 {
    padding-left: 0px;
    width: 8%;
  }
  .banner5 {
    padding-left: 0px;
    width: 7%;
    &:hover {
      color: #a84448;
      cursor: pointer;
    }
  }
  .banner6 {
    padding-top: 0px;
    width: 7%;
    &:hover {
      color: #a84448;
      cursor: pointer;
    }
  }
`;

const StyledList = styled.li<IHeaderContainerProps>`
  transition: all 0.3s ease-out;
  display: ${({ hovering }) => (hovering === "true" ? "flex" : "none")};
  &:hover {
    color: #a84448;
    cursor: pointer;
  }
  width: 100px;
`;

const Header: React.FC = () => {
  const hoverRef = useRef(null);
  const location = useLocation();
  const isHover = useHover(hoverRef);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  // const access_token = `Bearer ${localStorage.getItem("authToken")}`;

  const handleLogout = () => {
    // 로컬 스토리지에서 authToken 제거
    localStorage.removeItem("authToken");
    // localStorage.removeItem("refresh");
    // window.location.reload();
  };

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
    <HeaderContainer hovering={(isHover || false).toString()} y={y} pathname={pathname}>
      <nav>
        <div ref={hoverRef} className="hoverlayer">
          <LogoContainer hovering={(isHover || false).toString()} y={y}>
            <div className="tag" onClick={() => navigate("/")}>
              <WhiteMainlogo className="mainlogo" hovering={(isHover || false).toString()} y={y} pathname={pathname} />
            </div>
            <Ulist className="ull" hovering={(isHover || false).toString()} y={y}>
              <ul className="banner1">
                Product
                <StyledList
                  className="li1"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/alcohol")}
                >
                  주류 리스트
                </StyledList>
              </ul>
              <ul className="banner2">
                Order
                <StyledList
                  className="li3"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/likepage")}
                >
                  찜
                </StyledList>
                <StyledList
                  className="li4"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/cart")}
                >
                  장바구니
                </StyledList>
              </ul>
              <ul className="banner3">
                My Page
                <StyledList
                  className="li5"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/orderpage")}
                >
                  주문 내역
                </StyledList>
                <StyledList
                  className="li6"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/changeinfo")}
                >
                  개인 정보 수정
                </StyledList>
              </ul>
              <ul className="banner4">
                고객센터
                <StyledList
                  className="li7"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/helpcenter")}
                >
                  자주 묻는 질문
                </StyledList>
              </ul>
              <ul className="banner5">
                회원가입
                <StyledList
                  className="li8"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/signup")}
                ></StyledList>
              </ul>
              <ul className="banner6">
                {localStorage.getItem("authToken") ? (
                  <div onClick={handleLogout}>로그아웃</div>
                ) : (
                  <div onClick={() => navigate("/login")}>로그인</div>
                )}
              </ul>
            </Ulist>
          </LogoContainer>
        </div>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
/* 
  @media ${({ theme }) => theme.breakpoints.mobileMax} {
    & ul {
      display: none;
    }
  }
  @media ${({ theme }) => theme.breakpoints.mobileMax} {
    & ul {
      display: none;
    }
  }
  @media ${({ theme }) => theme.breakpoints.mobileMax} {
    & ul {
      display: none;
    }
  } */
