import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function authTokenExpired(authToken: string) {
  if (!authToken) {
    // authToken is missing
    return true; // treat as expired
  }

  // authToken is present
  const decodedToken = decodeAuthToken(authToken);
  const expSeconds = decodedToken.exp;
  const nowSeconds = Math.floor(Date.now() / 1000);

  return expSeconds < nowSeconds; // true if expired, false if valid
}

function decodeAuthToken(authToken: string) {
  // Implement the logic to decode the authToken
  // You can use a JWT decoding library or your own implementation
  const payload = authToken.split(".")[1];
  const decodedPayload = atob(payload);
  const { exp } = JSON.parse(decodedPayload);
  return { exp };
}

export default function FailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const access_token = `Bearer ${authToken}`;
  useEffect(() => {
    // Check if the authToken is missing or expired
    if (!access_token || authTokenExpired(access_token)) {
      navigate("/");
      return;
    }
  });

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
