import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export default function FailPage() {
  const [searchParams] = useSearchParams();

  return (
    <Failstyle>
      <div>
        <h1>결제 실패</h1>
        <div className="reason">{`${searchParams.get("message")}`}</div>
      </div>
    </Failstyle>
  );
}

const Failstyle = styled.div`
  padding-top: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & h1 {
    height: 200px;
    font-size: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div.reason {
    height: 200px;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
