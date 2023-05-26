import styled, { css } from "styled-components";
import { ReactComponent as Mainlogo } from "@assets/images/Logo.svg";
import { useRef, useEffect, useState } from "react";
import { useHover } from "usehooks-ts";
import Headerback from "@assets/images/Headerback.png";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Logoutmodal";

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
    padding-top: ${({ hovering }) => (hovering === "true" ? "30px" : "22px")};
    transition: all 0.3s ease-out;

    filter: drop-shadow(2px 4px 2px black);
    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 1297px) {
  }
  @media screen and (max-width: 860px) {
    left: 3%;
  }
  @media screen and (max-width: 767px) {
    & div.tag {
      width: 50%;
    }
  }
`;

const HeaderContainer = styled.div<IHeaderContainerProps>`
  width: 100%;
  position: fixed;
  transition: all 0.3s ease-out;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  & div.modal {
    color: #222222;
    border: 5px solid white;
    border-radius: 3px;
  }
  ${({ hovering, y, pathname }) =>
    y > 0 || hovering === "true"
      ? css`
          height: 120px;
          background-image: url(${Headerback});
        `
      : css`
          height: 0px;
          color: rgba(245, 245, 245, 1);
          background-image: none;
          color: ${pathname === "/" ? "rgba(245, 245, 245, 1)" : "#222222"};
        `}
`;

const WhiteMainlogo = styled(Mainlogo)<IHeaderContainerProps>`
  path {
    ${({ hovering, y, pathname }) =>
      y > 0 || hovering === "true"
        ? css`
            fill: #a84448;
          `
        : css`
         fill: ${pathname === "/" ? "rgba(245, 245, 245, 1)" : "#a84448"}; rgba(245, 245, 245, 1)" : "color: #222222"
          `}
    transition: all 0.5s ease-out;

    &:hover {
      fill: black;
      cursor: pointer;
      transition: all 0.3 ease;
    }
  }
`;
const Ulist = styled.div<IHeaderContainerProps>`
  display: flex;
  position: relative;
  padding-left: 10%;
  padding-right: 5%;
  width: 110%;
  transition: all 0.3s ease-out;
  font-family: Cafe24Anemone, sans-serif, Arial;

  filter: drop-shadow(2px 2px 1px grey);

  padding-top: ${({ hovering }) => (hovering === "true" ? "20px" : "30px")};
  & ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-weight: bold;

    font-size: ${({ hovering }) => (hovering === "true" ? "18px" : "21px")};
    transition: all 0.5s ease-out;
  }

  & ul {
    & li {
      padding-top: 4%;
      font-size: 14px;
      font-weight: 400;
      flex-direction: row;
    }
  }

  .banner1 {
    width: 20%;
  }
  .banner2 {
    width: 20%;
  }

  .banner3 {
    width: 20%;
  }
  .banner4 {
    width: 20%;
  }
  .banner6 {
    width: 20%;
    &:hover {
      color: #a84448;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    & ul {
      font-size: 15px;
      & li {
        font-size: 13px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    & ul {
      font-size: 13px;
      & li {
        font-size: 10px;
      }
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
`;

const Header: React.FC = () => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function authTokenExpired() {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      // authToken이 없는 경우
      return true; // 만료된 것으로 처리
    }

    // authToken이 있는 경우
    const decodedToken = decodeAuthToken(authToken);
    const expSeconds = decodedToken.exp;
    const nowSeconds = Math.floor(Date.now() / 1000);

    return expSeconds < nowSeconds; // 만료된 경우 true, 유효한 경우 false 반환
  }

  function decodeAuthToken(authToken: string) {
    // authToken을 디코딩하는 로직을 구현해야 합니다.
    // 실제로 사용하는 JWT 디코딩 라이브러리 등을 활용하면 됩니다.
    // 예시로는 페이로드에 exp 필드가 있다고 가정하고 처리하고 있습니다.
    const payload = authToken.split(".")[1];
    const decodedPayload = atob(payload);
    const { exp } = JSON.parse(decodedPayload);
    return { exp };
  }

  const handleLogout = () => {
    // 로컬 스토리지에서 authToken 제거
    localStorage.removeItem("authToken");
    localStorage.removeItem("refresh");
    localStorage.removeItem("exp");
    localStorage.removeItem("memberId");
    localStorage.removeItem("iat");
    setIsModalOpen(true);
    navigate("/");
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
                  className="li3"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/mypage/likepage")}
                >
                  찜
                </StyledList>
                <StyledList
                  className="li5"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/mypage/orderpage")}
                >
                  주문 내역
                </StyledList>
                <StyledList
                  className="li6"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/mypage/changeinfo")}
                >
                  개인 정보 수정
                </StyledList>
              </ul>
              <ul className="banner4">
                Help
                <StyledList
                  className="li7"
                  hovering={(isHover || false).toString()}
                  y={y}
                  onClick={() => navigate("/helpcenter")}
                >
                  자주 묻는 질문
                </StyledList>
              </ul>

              <ul className="banner6">
                {localStorage.getItem("authToken") ? (
                  // authToken이 있는 경우
                  authTokenExpired() ? ( // authToken이 만료된 경우
                    <div onClick={() => navigate("/login")}>로그인</div>
                  ) : (
                    <div onClick={handleLogout}>로그아웃</div>
                  )
                ) : (
                  <div onClick={() => navigate("/login")}>로그인</div>
                )}
              </ul>
            </Ulist>
          </LogoContainer>
        </div>
      </nav>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="modal">로그아웃이 되었습니다!</div>
        </Modal>
      )}
    </HeaderContainer>
  );
};

export default Header;
