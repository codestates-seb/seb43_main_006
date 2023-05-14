import axios from "axios";
import { useState, useEffect } from "react";
type AxiosAllParameter = {
  type: object;
};
type DoAxiosFunction = (method: string, path: string, body?: object, needToken?: boolean, login?: boolean) => void;
// interface Axios {
//   (method: "get" | "post" | "put" | "delete", path: string, body?: object, needToken?: boolean, login?: boolean): void;
// }

const useAxiosAll = (): [DoAxiosFunction, object, string, boolean] => {
  const [data, setData] = useState({});
  const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);

  const doAxios = (method: string, path: string, body: object = {}, needToken = true, login = false): void => {
    let header = {};
    let requestCon = {};

    if (needToken) {
      header = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
        "ngrok-skip-browser-warning": "69420",
      };
    } else {
      header = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      };
    }

    if (Object.keys(body).length > 0) {
      requestCon = {
        method: method,
        url: `${process.env.REACT_APP_API_URL}${path}`,
        headers: header,
        data: body,
      };
    } else {
      requestCon = {
        method: method,
        url: `${process.env.REACT_APP_API_URL}${path}`,
        headers: header,
      };
    }

    axios
      .request(requestCon)
      .then((res) => {
        console.log(res);
        console.log(res.status);
        setOk(true);
        if (res.data.data) {
          setData(res.data.data);
        }
        if (login) {
          localStorage.setItem("authToken", res.headers.authorization);
          localStorage.setItem("memberId", res.headers["x-member-id"]);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401 || err.status === 409) {
          localStorage.setItem("authToken", err.headers.authorization);
          axios
            .request(requestCon)
            .then((res) => {
              console.log(res);
              setOk(true);
              if (res.data.data) {
                setData(res.data.data);
              }
            })
            .catch((err) => {
              console.log(err);
              setErr("에러발생");
            });
        } else {
          setErr("에러발생");
          console.log(err);
        }
      });
  };

  return [doAxios, data, err, ok];
};

export default useAxiosAll;
