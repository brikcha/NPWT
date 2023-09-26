import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
      token: "null",
    },
    reducers: {
      setToken: (state, action) => {
        console.log("action payload " +action.payload)
        state.token = action.payload; 
        console.log("state token " +state.token);
      },
    },
  });
  export const selectToken = (state) => {
    console.log(state.auth.token)
    return state.auth.token;
  };
  export default authSlice.reducer;
  export const {setToken} = authSlice.actions;