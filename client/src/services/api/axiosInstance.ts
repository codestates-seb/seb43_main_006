import axios from "axios";

// Axios instance 생성
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

// Request interceptor 설정
instance.interceptors.request.use(
  async (config) => {
    // No-Auth 헤더가 없는 경우에만 토큰을 추가
    if (!config.headers["No-Auth"]) {
      const authToken = `Bearer ${localStorage.getItem("authToken")}`;
      const refresh = localStorage.getItem("refresh");
      if (refresh && authToken) {
        config.headers["Refresh"] = refresh;
        config.headers["Authorization"] = authToken;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// Response interceptor 설정
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // originalRequest._retry: 원래의 요청을 이미 한 번 다시 보냈는지를 나타내는 플래그
    const originalRequest = err.config;

    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return axios
        .post(
          `${process.env.REACT_APP_API_URL}/members/token`,
          {},
          {
            headers: {
              refresh: localStorage.getItem("refresh"),
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            const dateToSeconds = (dateString: string) => {
              const date = new Date(dateString);
              const seconds = Math.floor(date.getTime() / 1000);

              return `${seconds}`;
            };

            console.log(res);
            localStorage.setItem("authToken", res.headers.authorization);
            localStorage.setItem("refresh", res.headers.refresh);
            localStorage.setItem("exp", dateToSeconds(res.headers.exp));
            localStorage.setItem("iat", dateToSeconds(res.headers.iat));

            return instance(originalRequest); // 새로운 토큰을 성공적으로 받아온 후, 원래의 요청을 다시 보내는 부분
          }
        })
        .catch(() => {
          localStorage.removeItem("refresh");
          localStorage.removeItem("authToken");
          localStorage.removeItem("exp");
          localStorage.removeItem("iat");
          localStorage.removeItem("memberId");
        });
    }
    return Promise.reject(err);
  },
);

export default instance;
