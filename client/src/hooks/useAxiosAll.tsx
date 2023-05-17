import axios from "axios";
import { useState } from "react";

type DoAxiosFunction = (method: string, path: string, body?: object, needToken?: boolean) => void;

const useAxiosAll = (): [DoAxiosFunction, object, boolean, boolean] => {
  // 응답 데이터, err 여부, 성공 여부
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  const [ok, setOk] = useState(false);

  const doAxios = async (method: string, path: string, body: object = {}, needToken = true): Promise<void> => {
    let header = {};
    let requestCon = {};

    if (needToken) {
      const dateString = localStorage.getItem("exp")?.replace("KST", "") as string; // 만료시간 형 변환
      const expSeconds = Math.floor(new Date(dateString).getTime() / 1000); // 만료시간 초 변환
      const nowSeconds = Math.floor(new Date().getTime() / 1000); // 현재시간 초 변환

      if (expSeconds < nowSeconds) {
        // 만료시간이 지난 경우
        console.log("토큰 만료된 경우");
        // 엑세스 토큰 갱신
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/members/token`,
            {},
            {
              headers: {
                Authorization: localStorage.getItem("authToken"),
                refresh: localStorage.getItem("refresh"),
              },
            },
          )
          .then((res) => {
            console.log(res.headers);
            localStorage.setItem("authToken", res.headers.authorization); // 토큰 저장
            localStorage.setItem("refresh", res.headers.refresh); // refresh 토큰 저장
          })
          .catch((err) => console.log(err));
      } else {
        if (needToken) {
          // 토큰 필요시 토큰 포함
          header = {
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
      }
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

    console.log("본 요청 실시");
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
        setErr(true);
        console.log(err);
      });
  };

  return [doAxios, data, err, ok];
};

export default useAxiosAll;
