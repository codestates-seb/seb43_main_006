import styled from "styled-components";
import mainmiddle from "../assets/images/Mainmiddle.png";
import samplingimg from "../assets/images/samplingimg.png";

export function Homelayout1() {
  return (
    <Homelayoutstyled1>
      <div className="glad">
        <div>Welcome</div>
        <div>To</div>
        <div className="smallglad">매주 매일 매년 함께</div>
        <div>Meju Meju</div>
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
  .glad {
    padding-top: 500px;
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .smallglad {
    font-size: 16px;
    padding-left: 2%;
    padding-right: 2%;
    font-weight: bold;
    display: flex;
    align-items: flex-end;
    height: 100px;
  }
`;

export function Homelayout2() {
  return (
    <Homelayoutstyled2>
      <div className="glad2">
        <div className="smallglad1">매주 함께하는 우리</div>
        <div className="smallglad2">어서 오세요!</div>
      </div>
    </Homelayoutstyled2>
  );
}

const Homelayoutstyled2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontColor};
  width: 100%;
  .glad2 {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    font-size: 48px;
    padding-top: 300px;
    padding-left: 2%;
    padding-right: 2%;
    padding-bottom: 500px;
  }
  .smallglad1 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .smallglad2 {
    font-size: 25px;
    flex-direction: row;
    color: ${({ theme }) => theme.colors.themeColor};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export function Homelayout3() {
  return (
    <Homelayoutstyled3>
      <div className="firstbox">
        <div>저희 매주매주는 술을 사랑하는 여러분들을 위해</div>
        <div className="list_maju">
          <div className="maju">매주</div>
          <ul className="maju_list">
            <li>휴식을 할 때 함께할,</li>
            <li>고된 하루를 극복할,</li>
            <li>사랑하는 사람과 함께 할 때</li>
            <li>늘 곁에 있겠습니다.</li>
          </ul>
        </div>
      </div>
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
  .firstbox {
    display: flex;
    font-size: 30px;
    width: 100%;
    padding-bottom: 100px;
    align-items: center;
    flex-direction: column;
    height: 400px;
  }
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

export function Homelayout4() {
  return (
    <Homelayoutstyled4>
      <div className="glad3-item">
        <img src={mainmiddle} alt="Main middle" className="Mainmiddle"></img>
        <br />
        <div className="glad3">Welcome To Meju Meju</div>
      </div>
    </Homelayoutstyled4>
  );
}

const Homelayoutstyled4 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontColor};
  .Mainmiddle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1800px;
    padding-left: 0;
    padding-right: 12%;
    padding-top: 900px;
  }
  .glad3-item {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 800px;
    padding-left: 14%;
  }
  .glad3 {
    padding-left: 0;
    padding-right: 10%;
  }
`;

export function Homelayout5() {
  return (
    <Homelayoutstyled5>
      <div className="glad4-item">
        <img src={samplingimg} alt="samplingimg" className="samplingimg"></img>
        <div className="glad4">
          Welcome
          <br />
          To <br />
          Meju <br />
          Meju
        </div>
      </div>
    </Homelayoutstyled5>
  );
}
const Homelayoutstyled5 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.fontColor};
  .samplingimg {
    height: 80vh;
    width: 100%;
  }
  .glad4-item {
    flex-direction: row;
    display: flex;
    justify-content: center;
    padding-top: 550px;
    padding-left: 10%;
  }
  .glad4 {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 1%;
  }
`;

export function Alcoholinfo() {
  return <div></div>;
}
