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
      return action.payload;
    },
  },
});

export const { setToken, setLogout } = loginState.actions;
export const { setMarker } = markerState.actions;

export default configureStore({
  reducer: {
    loginState: loginState.reducer,
    markerState: markerState.reducer,
  },
});
//0517 11:30am
