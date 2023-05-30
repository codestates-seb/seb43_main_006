import styled, { keyframes, css } from "styled-components";
interface H2props {
  primary?: boolean;
}

export function Homelayout1() {
  return (
    <Homelayoutstyled1>
      <div className="glad">
        <div className="glad-line">
          <div>Welcome</div>
          <div>To</div>
        </div>
        <Heading>
          <BouncingText>매주 매일 매년 함께</BouncingText>
        </Heading>
        <div className="glad-line">
          <div>Meju</div>
          <div>Meju</div>
        </div>
      </div>
    </Homelayoutstyled1>
  );
}
const Homelayoutstyled1 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontColor};
  height: 100vh;
  .glad {
    width: 70%;
    font-size: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .glad-line {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  @media (max-width: 1516px) {
    .glad-line {
      flex-direction: column;
    }
  }

  @media (max-width: 909px) {
    .glad {
      font-size: 32px;
    }
  }
`;

export function Homelayout2() {
  return (
    <Homelayoutstyled2>
      <Content>
        <H2 primary={true}>오늘 한잔 어때 ?</H2>
        <H2>오늘 한잔 어때 ?</H2>
      </Content>
    </Homelayoutstyled2>
  );
}

const Homelayoutstyled2 = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  position: relative;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const animate = keyframes`
  0%, 100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
`;

const H2 = styled.h2<H2props>`
  color: ${(props) => (props.primary ? "transparent" : "#cd853f")};
  font-size: 2em;
  position: absolute;
  -webkit-text-stroke: 2px #cd853f;
  ${(props) =>
    !props.primary &&
    css`
      animation: ${animate} 3s ease-in-out infinite;
    `}
`;

export function Homelayout3() {
  return (
    <Homelayoutstyled3>
      <Heading>
        <BouncingText>매주</BouncingText>
      </Heading>
      <Container>
        <Animation>
          <FirstAnimation>
            <AnimatedText>휴식을 함께 할 때</AnimatedText>
          </FirstAnimation>
          <SecondAnimation>
            <AnimatedText>고된 하루를 마쳤을 때</AnimatedText>
          </SecondAnimation>
          <ThirdAnimation>
            <AnimatedText>사랑하는 사람과 함께할 때</AnimatedText>
          </ThirdAnimation>
        </Animation>
        <p>늘 곁에 있겠습니다.</p>
      </Container>
    </Homelayoutstyled3>
  );
}

const Homelayoutstyled3 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontColor};
  width: 100%;
  display: flex;
  font-size: 30px;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  .maju_list {
    padding-left: 40px;
    padding-bottom: 10%;
    flex-direction: column;
    height: 200px;
    overflow: visible;
  }
  .maju {
    padding-top: 30px;
    font-size: 50px;
    height: 200px;
    display: flex;
    justify-content: flex-end;
  }
  .list_maju {
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;
const textAnimation = keyframes`
  0% { margin-top: 0; }
  10% { margin-top: 0; }
  20% { margin-top: -5.62rem; }
  30% { margin-top: -5.62rem; }
  40% { margin-top: -11.24rem; }
  60% { margin-top: -11.24rem; }
  70% { margin-top: -5.62rem; }
  80% { margin-top: -5.62rem; }
  90% { margin-top: 0; }
  100% { margin-top: 0; }
`;

const Container = styled.div`
  color: #e5e5e5;
  font-size: 2.26rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin-left: 30px;
    text-shadow: 0 0 7px rgba(22, 22, 22, 0.9), 0 0 3px rgba(22, 22, 22, 0.5);
  }
`;

const Animation = styled.div`
  height: 50px;
  overflow: hidden;
  margin-left: 1rem;
`;

const AnimatedText = styled.div`
  padding: 0.25rem 0.75rem;
  height: 2.81rem;
  margin-bottom: 2.81rem;
  display: inline-block;
`;

const FirstAnimation = styled.div`
  background-color: #20a7d8;
  animation: ${textAnimation} 8s infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SecondAnimation = styled.div`
  background-color: #cd921e;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThirdAnimation = styled.div`
  background-color: #c10528;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Homelayout4() {
  return (
    <Homelayoutstyled4>
      <Heading>
        <BouncingText>M</BouncingText>
        <BouncingText>e</BouncingText>
        <BouncingText>j</BouncingText>
        <BouncingText>u</BouncingText>
        <BouncingText>M</BouncingText>
        <BouncingText>e</BouncingText>
        <BouncingText>j</BouncingText>
        <BouncingText>u</BouncingText>
      </Heading>
    </Homelayoutstyled4>
  );
}

const Homelayoutstyled4 = styled.div`
  width: 100%;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const bounceAnimation = keyframes`
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #CCC,
                 0 2px 0 #CCC,
                 0 3px 0 #CCC,
                 0 4px 0 #CCC,
                 0 5px 0 #CCC,
                 0 6px 0 #CCC,
                 0 7px 0 #CCC,
                 0 8px 0 #CCC,
                 0 9px 0 #CCC,
                 0 50px 25px rgba(0, 0, 0, .2);
  }
`;

const Heading = styled.h1`
  height: 100px;
`;

const BouncingText = styled.span`
  position: relative;
  top: 20px;
  display: inline-block;
  animation: ${bounceAnimation} 0.3s ease infinite alternate;
  font-family: "Titan One", cursive;
  font-size: 80px;
  color: #222222;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc, 0 5px 0 #ccc, 0 6px 0 transparent,
    0 7px 0 transparent, 0 8px 0 transparent, 0 9px 0 transparent, 0 10px 10px rgba(0, 0, 0, 0.4);
`;

export function Homelayout5() {
  return (
    <MainContainer>
      <Heading1>오늘은 땡기는 술은?</Heading1>
      <Roller>
        <RollText>
          Rum
          <br />
          Whisky
          <br />
          Vodka
          <br />
          Brandy
          <br />
          Tequila
          <br />
          Gin
          <br />
          Liqueur
          <br />
          <SpareTime>So ju</SpareTime>
        </RollText>
      </Roller>
    </MainContainer>
  );
}
const slide = keyframes`
  0% {
    top: 0;
    color : #cd853f;
  }
  12.5% {
    top : -6rem;
    color : #4b0082;
  }
  25% {
    top: -12rem;
    color : #1e90ff;
  }
  37.5% {
    top: -18rem;
    color : #ff6347;
  }
  50% {
    top: -24rem;
    color : #222222;
  }
  62.5% {
    top: -30rem;
    color : #00fa9a;
  }
  75% {
    top: -36rem;
    color : #daa520;
  }
  100% {
    color : #ff7f50;
  }
`;

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const Heading1 = styled.h1`
  text-align: center;
  text-transform: uppercase;
  color: #222222;
  font-size: 4rem;
`;

const Roller = styled.div`
  height: 6rem;
  line-height: 6rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d3557;
`;

const RollText = styled.span`
  position: absolute;
  top: 0;
  animation: ${slide} 8s infinite;
`;

const SpareTime = styled.span`
  font-size: 1rem;
  font-style: italic;
  letter-spacing: "1rem";
  margin-top: 0;
  color: #a8dadc;
`;
