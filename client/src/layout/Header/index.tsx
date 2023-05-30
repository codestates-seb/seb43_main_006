import styled, { css, keyframes } from "styled-components";
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
  isOpen?: string;
  style?: string;
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
  color: ${({ theme }) => theme.colors.fontColor};

  & div.tag {
    padding-top: ${({ hovering }) => (hovering === "true" ? "30px" : "22px")};
    transition: all 0.3s ease-out;

    filter: drop-shadow(2px 4px 2px rgba(8, 8, 8, 0.5));
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
      width: 75%;
      padding-top: 0px;
    }
  }
  @media screen and (max-width: 767px) {
    height: 50px;
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

  @media (max-width:767px) {
    background-image: none;
    height: 0;

    .mainlogo {
      width: 100px;
    }
  }
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
  @media (max-width: 767px) {
    width: 70%;
  }
`;
const Ulist = styled.div<IHeaderContainerProps>`
  display: flex;
  position: relative;
  padding-left: 10%;
  padding-right: 5%;
  width: 110%;
  transition: all 0.3s ease-out;
  font-weight: bold;

  filter: drop-shadow(2px 2px 1px #ccc);

  padding-top: ${({ hovering }) => (hovering === "true" ? "20px" : "30px")};
  & ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: ${({ hovering }) => (hovering === "true" ? "18px" : "21px")};
    transition: all 0.5s ease-out;
  }

  & ul {
    & li {
      height: 20px;
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
    display: none;
  }
`;

const StyledList = styled.li<IHeaderContainerProps>`
  transition: all 0.3s ease-out;
  display: ${({ hovering }) => (hovering === "true" ? "flex" : "none")};
  &:hover {
    color: #a84448;
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;
const AccordionMenu = styled.div<IHeaderContainerProps>`
  display: none;

  .li_padding {
    padding: 0.8rem 1rem;
  }
  @media screen and (max-width: 767px) {
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-family: WanjuRegular, sans-serif, Arial;
    padding: 13px 0;
    text-align: right;
    border-radius: 5px;
    font-size: 16px;
    color: #a84448;
    background-color: none;
  }
  & div.onclick {
    text-align: right;
    padding: 0;
    padding-right: 12px;
    padding-bottom: 0.5rem;
    filter: drop-shadow(2px 2px 1px rgba(8, 8, 8, 0.5));
  }
`;
const AccordionMenuItem = styled.div<IHeaderContainerProps>`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: #a84448;
  cursor: pointer;
  background-color: ${(props) => (props.isOpen ? "none" : "rgba(247,247,247,0.7)")};
  animation: ${(isOpen) => (isOpen ? slideIn : slideOut)} 0.3s ease;
  transition: background-color 0.3s ease-out;
  width: ${(props) => (props.isOpen ? "0px" : "150px")};
  height: ${(props) => (props.isOpen ? "0px" : "100px")};
  border: ${(props) => (props.isOpen ? "none" : "1px solid rgba(8,8,8,0.1)")};
`;

const Header: React.FC = () => {
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

  const toggleAccordionMenu = () => {
    setIsAccordionOpen(!isAccordionOpen);
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

            <AccordionMenu hovering={(isHover || false).toString()} y={y}>
              {isAccordionOpen ? (
                <div
                  onBlur={() => setIsAccordionOpen(!isAccordionOpen)}
                  className="onclick"
                  onClick={toggleAccordionMenu}
                >
                  Menu
                </div>
              ) : (
                <div className="onclick" onClick={toggleAccordionMenu}>
                  Menu
                </div>
              )}
              {isAccordionOpen && (
                <>
                  <AccordionMenuItem
                    className="li_padding"
                    hovering={(isHover || false).toString()}
                    y={y}
                    onClick={() => {
                      navigate("/alcohol");
                      toggleAccordionMenu();
                    }}
                  >
                    주류 리스트
                  </AccordionMenuItem>
                  <AccordionMenuItem
                    className="li_padding"
                    hovering={(isHover || false).toString()}
                    y={y}
                    onClick={() => {
                      navigate("/cart");
                      toggleAccordionMenu();
                    }}
                  >
                    장바구니
                  </AccordionMenuItem>
                  <AccordionMenuItem
                    className="li_padding"
                    hovering={(isHover || false).toString()}
                    y={y}
                    onClick={() => {
                      navigate("/mypage/likepage");
                      toggleAccordionMenu();
                    }}
                  >
                    찜
                  </AccordionMenuItem>
                  <AccordionMenuItem
                    className="li_padding"
                    hovering={(isHover || false).toString()}
                    y={y}
                    onClick={() => {
                      navigate("/mypage/orderpage");
                      toggleAccordionMenu();
                    }}
                  >
                    주문 내역
                  </AccordionMenuItem>
                  <AccordionMenuItem
                    className="li_padding"
                    hovering={(isHover || false).toString()}
                    y={y}
                    onClick={() => {
                      navigate("/mypage/changeinfo");
                      toggleAccordionMenu();
                    }}
                  >
                    개인 정보 수정
                  </AccordionMenuItem>
                  <AccordionMenuItem
                    className="li_padding"
                    hovering={(isHover || false).toString()}
                    y={y}
                    onClick={() => {
                      navigate("/helpcenter");
                      toggleAccordionMenu();
                    }}
                  >
                    자주 묻는 질문
                  </AccordionMenuItem>
                  <AccordionMenuItem
                    className="li_padding"
                    hovering={(isHover || false).toString()}
                    y={y}
                    onClick={() => {
                      if (localStorage.getItem("authToken")) {
                        if (authTokenExpired()) {
                          {
                            navigate("/login");
                            toggleAccordionMenu();
                          }
                        } else {
                          {
                            handleLogout();
                            toggleAccordionMenu();
                          }
                        }
                      } else {
                        {
                          navigate("/login");
                          toggleAccordionMenu();
                        }
                      }
                    }}
                  >
                    {localStorage.getItem("authToken") ? (authTokenExpired() ? "로그인" : "로그아웃") : "로그인"}
                  </AccordionMenuItem>
                </>
              )}
            </AccordionMenu>
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
