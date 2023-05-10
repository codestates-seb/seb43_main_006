import maintop from "../assets/images/Maintop.png";
import mainmiddle from "../assets/images/Mainmiddle.png";
import samplingimg from "../assets/images/samplingimg.png";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import samplelist from "../assets/images/samplelist.png";

interface ScrollState {
  x: number;
  y: number;
}
const Home: React.FC = () => {
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
    <HomeContainer>
      <img src={maintop} alt="Main Top" className="Maintop" />
      <div className="glad" style={{ opacity: y > 650 ? (y > 1250 ? "0" : "1") : "0" }}>
        <div>Welcome</div>
        <div>To</div>
        <div className="smallglad">매주 매일 매년 함께</div>
        <div>Meju Meju</div>
      </div>
      <div className="glad2" style={{ opacity: y > 900 ? (y > 1500 ? "0" : "1") : "0" }}>
        <div>매주 함께하는 우리</div>
        <div className="smallglad2">어서 오세요!</div>
      </div>
      <div className="firstbox" style={{ opacity: y > 1500 ? (y > 2100 ? "0" : "1") : "0" }}>
        <li>저희 매주매주는 술을 사랑하는 여러분들을 위해</li>
        <li className="list_maju">
          <ul className="maju">매주</ul>
          <ul className="maju_list">
            <li>휴식을 할 때 함께할,</li>
            <li>고된 하루를 극복할,</li>
            <li>사랑하는 사람과 함께 할 때</li>
            <li>늘 곁에 있겠습니다.</li>
          </ul>
        </li>
      </div>
      <div className="glad3-item">
        <img
          src={mainmiddle}
          alt="Main middle"
          className="Mainmiddle"
          style={{ opacity: y > 2000 ? (y > 2750 ? "0" : "1") : "0" }}
        ></img>
        <br />
        <div className="glad3" style={{ opacity: y > 2500 ? (y > 3100 ? "0" : "1") : "0" }}>
          Welcome To Meju Meju
        </div>
        <div className="glad4-item">
          <img
            src={samplingimg}
            alt="samplingimg"
            className="samplingimg"
            style={{ opacity: y > 3200 ? (y > 4050 ? "0" : "1") : "0" }}
          ></img>
          <div className="glad4" style={{ opacity: y > 3200 ? (y > 3800 ? "0" : "1") : "0" }}>
            Welcome
            <br />
            To <br />
            Meju <br />
            Meju
          </div>
        </div>
        <p className="sales" style={{ opacity: y > 4100 ? (y > 4800 ? "0" : "1") : "0" }}>
          구매율이 높은 상품
        </p>
      </div>
      <div className="saleslist">
        <p>
          위스키 계열
          <ul className="1stsales">
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
          </ul>
        </p>
        <p>
          보드카 계열
          <ul className="2ndsales">
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
            <li>
              <img src={samplelist} className="slist" alt="sample list" />
            </li>
          </ul>
        </p>
      </div>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.section`
  color: ${({ theme }) => theme.colors.fontColor}
  flex-direction: column;
  align-items: flex-start;
  max-width: 1440px;
  font-size: 96px;
  overflow : hidden;

  .Maintop {
    position: relative;
    top: 0;
    padding-top: 0;
    height: 840px;
    width: 1440px;
  }

  .Mainmiddle {
    display: flex;
    justify-content :center;
    align-items : center;
    width:100%;
    height:1800px;
    padding-left : 95px;
    padding-right : 95px;
    padding-top : 900px;
    transition: all 0.5s ease-in-out;
  }
  & * {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 1440px;
    height: 200px;
    color: ${({ theme }) => theme.colors.fontColor};
  }
  & div {
    padding-left: 40px;
    padding-right: 40px;
    display: flex;
  }
  .glad {
    padding-top: 500px;
    transition: all 0.5s ease-in-out;
  }
  .smallglad {
    font-size: 16px;
    padding-left: 40px;
    padding-right: 40px;
    font-weight: bold;
    align-items: flex-end;
    height: 100px;
  }
  .glad2 {
    display : flex;
    align-items:center;
    width: 550px;
    justify-content: center;
    flex-direction: column;
    font-size: 48px;
    padding-top: 300px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom : 500px;
    transition: all 0.5s ease-in-out;
  }
  .smallglad2 {
    font-size: 25px;
    flex-direction: row;
    color: ${({ theme }) => theme.colors.themeColor};
  }
  .firstbox {
    display: flex;
    font-size: 30px;
    width: 1440px;
    padding-bottom: 100px;
    align-items: center;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    height : 400px;
  }
  .maju_list {
    padding-left: 100px;
    padding-bottom: 100px;
    flex-direction: column;
    height : 200px;
    overflow : visible;
  }
  .maju {
    padding-top: 30px;
    padding-left: 30px;
    font-size: 50px;
    height : 200px;
    color: ${({ theme }) => theme.colors.themeColor};
  }
  .list_maju {
    padding-top: 30px;
  }
  .glad3-item {
    flex-direction : column;
    display: flex;
    align-items :center;
    justify-content : center;
    padding-top : 800px;
  }
 .glad3 {
  transition: all 0.5s ease-in-out;
 }
 .samplingimg {
  transition: all 0.5s ease-in-out;
  width : 800px;
  height : 600px;
 }
 .glad4-item {
    flex-direction : row;
    display: flex;
    justify-content : center;
    padding-top : 550px;
 }
 .glad4 {
  transition: all 0.5s ease-in-out;
  width : 1250px;
  display:flex;
  align-items : flex-start;
  flex-direction : row;
  justify-content: flex-start;
 }
 .sales {
  width : 1250px;
  display:flex;
  align-items : flex-start;
  padding-top: 1000px;
  padding-bottom : 200px;
  flex-direction : row;
  justify-content: flex-start;
  font-size : 48px;
  color : ${({ theme }) => theme.colors.themeColor};
  transition: all 0.5s ease-in-out;
 }
 .saleslist {
  max-width: 1250px;
  margin : 0;
  padding-top : 1600px;
  height : 1880px;
  flex-direction : column;
  padding-left : 200px;
  & p {
    font-size : 20px;
    padding-left : 20px;
    height : 30px;
  }
}

.1stsales {
  max-width : 1250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height : 1200px;
}

.2ndsales {
  max-width : 1250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height : 1200px;
}
.slist {
  width: 158px;
  height: 158px;
  margin: 10px;
  object-fit: cover;
}
  & ul {
    overflow-x :scroll;
    height : 220px;
    &li {
    }
  }
`;
