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
      localStorage.removeItem("memberId");
    },
  },
});

export const { setToken, setLogout } = loginState.actions;

export default configureStore({
  reducer: {
    loginState: loginState.reducer,
  },
});
