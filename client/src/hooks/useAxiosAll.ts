import axios from "axios";
import { useState, useEffect } from "react";

type DoAxiosFunction = (method: string, path: string, body?: object, needToken?: boolean) => void;

const useAxiosAll = (): [DoAxiosFunction, object, boolean, boolean] => {
  // 응답 데이터, err 여부, 성공 여부
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  const [ok, setOk] = useState(false);

  const doAxios = (method: string, path: string, body: object = {}, needToken = true): void => {
    let header = {};
    let requestCon = {};

    if (needToken) {
      // 토큰 필요시 토큰 포함
      header = {
        Refresh: localStorage.getItem("refresh"),
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
        "ngrok-skip-browser-warning": "69420",
      };
    } else {
      // 토큰 미포함
      header = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      };
    }

    if (Object.keys(body).length > 0) {
      // body 필요시 body 포함 요청 구성
      requestCon = {
        method: method,
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
        console.log(res);
        setOk(true);
        if (res.data.data) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        // 요청 실패시
        console.log(err.response.status);
        console.log(err);
        if (err.response.status === 401 || err.response.status === 409) {
          // 401 409 에러 상태 일 경우
          console.log("분기통과");

          localStorage.setItem("authToken", err.response.headers.authorization); // 토큰 재저장
          localStorage.setItem("refresh", err.response.headers.refresh); // 리프레쉬 재저장
          if (needToken) {
            // 토큰 필요시 토큰 포함
            header = {
              Refresh: localStorage.getItem("refresh"),
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("authToken"),
              "ngrok-skip-browser-warning": "69420",
            };
          } else {
            // 토큰 미포함
            header = {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            };
          }
          if (Object.keys(body).length > 0) {
            // body 필요시 body 포함 요청 구성
            requestCon = {
              method: method,
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
          console.log("다시 전송한 객체", requestCon);
          axios // 요청 재 전송
            .request(requestCon)
            .then((res) => {
              // 요청 성공시
              console.log(res);
              setOk(true);
              if (res.data.data) {
                setData(res.data.data);
              }
            })
            .catch((err) => {
              // 이후에도 실패일 경우 실패
              console.log(err);
              setErr(true);
            });
        } else {
          // 401 409 가 아닐 경우 실패 상태 바로 저장
          setErr(true);
          console.log(err);
        }
      });
  };

  return [doAxios, data, err, ok];
};

export default useAxiosAll;
