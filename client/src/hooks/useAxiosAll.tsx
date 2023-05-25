import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DoAxiosFunction = (method: string, path: string, body?: object, needToken?: boolean) => void;

const useAxiosAll = (): [DoAxiosFunction, object, boolean, boolean] => {
  // 응답 데이터, err 여부, 성공 여부
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  const [ok, setOk] = useState(false);
  const navigate = useNavigate();

  const doAxios = async (method: string, path: string, body: object = {}, needToken = true): Promise<void> => {
    let header = {};
    let requestCon = {};

    if (needToken) {
      const expSeconds = Number(localStorage.getItem("exp"));
      const nowSeconds = Math.floor(new Date().getTime() / 1000); // 현재시간 초 변환

      if (expSeconds < nowSeconds) {
        // 만료시간이 지난 경우
        // 엑세스 토큰 갱신

        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/members/token`,

            {},
            {
              headers: {
                refresh: localStorage.getItem("refresh"),
              },
            },
          )
          .then((res) => {
            const token = res.headers.authorization;
            localStorage.setItem("authToken", token.replace(/^Bearer\s/, "")); // 토큰 저장
            localStorage.setItem("refresh", res.headers.refresh); // refresh 토큰 저장
          })
          .catch(() => {
            localStorage.removeItem("authToken"); // 토큰 지우기
            localStorage.removeItem("refresh"); // refresh 지우기
            localStorage.removeItem("memberId"); //
            localStorage.removeItem("exp");
            localStorage.removeItem("iat");
            navigate("/login");
            localStorage.setItem("needLogin", "needLogin");
          });
      }
      if (needToken) {
        // 토큰 필요시 토큰 포함
        const access_token = `Bearer ${localStorage.getItem("authToken")}`;
        header = {
          "Content-Type": "application/json",
          Authorization: access_token,
          "ngrok-skip-browser-warning": "69420",
        };
      } else {
        // 토큰 미포함
        header = {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        };
      }
    }

    if (Object.keys(body).length > 0) {
      // body 필요시 body 포함 요청 구성
      requestCon = {
        method: method,
        // url: `${process.env.REACT_APP_API_URL}${path}`,
        url: `${process.env.REACT_APP_API_URL}${path}`,
        headers: header,
        data: body,
      };
    } else {
      // body 필요시 body 미포함 요청 구성
      requestCon = {
        method: method,
        url: `${process.env.REACT_APP_API_URL}${path}`,
        headers: header,
      };
    }

    axios
      .request(requestCon)
      .then((res) => {
        // 요청 성공시

        setOk(true);
        if (res.data.data) {
          setData(res.data.data);
        }
      })
      .catch(() => {
        // 요청 실패시
        setErr(true);
      });
  };

  return [doAxios, data, err, ok];
};

export default useAxiosAll;
