
import { createSlice } from "@reduxjs/toolkit";

// Restore authentication state
let saved = null;

try {
  saved = JSON.parse(localStorage.getItem("auth") || "null");
} catch {
  localStorage.removeItem("auth");
}

const initialState = {
  user: saved?.user || null,
  accessToken: saved?.accessToken || null,
  refreshToken: saved?.refreshToken || null,
  isAuthenticated: Boolean(saved?.accessToken),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user ?? null;
      state.accessToken = accessToken ?? null;
      state.refreshToken = refreshToken ?? null;
      state.isAuthenticated = Boolean(accessToken);

      const authData = {
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      };

      localStorage.setItem("auth", JSON.stringify(authData));

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
      } else {
        localStorage.removeItem("access_token");
      }

      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      } else {
        localStorage.removeItem("refresh_token");
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("auth");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
