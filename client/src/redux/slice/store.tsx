import { configureStore, createSlice } from "@reduxjs/toolkit";

const isLogin = createSlice({
  //로그인 상태 관리를 위한 store, true시 로그인 상태 false시 로그아웃 상태
  name: "isLogin",
  initialState: false,
  reducers: {
    setLogin() {
      return true;
    },
    setLogout() {
      return false;
    },
  },
});

//reducer export
export const { setLogin, setLogout } = isLogin.actions;

export default configureStore({
  reducer: {
    isLogin: isLogin.reducer,
  },
});
