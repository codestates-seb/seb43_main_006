import { createSlice, configureStore } from "@reduxjs/toolkit";

const loginState = createSlice({
  name: "login",
  initialState: {
    token: null,
    isLogin: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      state.token = null;
      state.isLogin = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("refresh");
      localStorage.removeItem("memberId");
    },
  },
});

const markerState = createSlice({
  name: "markerState",
  initialState: {
    address: "",
    choice: false,
    comment: "",
    lat: 1,
    lng: 1,
    marketId: 1,
    name: "",
    phone: "",
    workTime: "",
  },
  reducers: {
    setMarker: (state, action) => {
      // 기존의 상태를 변경하지 않고 새로운 객체를 반환
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

const dateState = createSlice({
  name: "dateState",
  initialState: {
    Date: new Date(), // 초기값을 문자열로 설정
  },
  reducers: {
    setDate: (state, action) => {
      state.Date = action.payload;
    },
  },
});

export const { setToken, setLogout } = loginState.actions;
export const { setMarker } = markerState.actions;
export const { setDate } = dateState.actions;

export default configureStore({
  reducer: {
    loginState: loginState.reducer,
    markerState: markerState.reducer,
    dateState: dateState.reducer,
  },
});
