import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    name: "",
    username: "",
    token: "",
  },
  reducers: {
    userLogin(state, action) {
      return {
        ...state,
        name: action.payload.name,
        username: action.payload.username,
        token: action.payload.token,
      };
    },
    userLogout(state, action) {
      return { ...state, name: "", username: "", token: "" };
    },
  },
});

export const { userLogin, userLogout } = slice.actions;
export default slice.reducer;
