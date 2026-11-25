import { store } from "../app/store";
import { setCredentials, logout } from "../features/auth/authSlice";

export const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "https://api.mati-rehman.com"
).replace(/\/+$/, "");

export function extractAccessToken(data) {
  return (
    data?.access_token ||
    data?.accessToken ||
    data?.token ||
    data?.data?.access_token ||
    data?.data?.token ||
    null
  );
}

export function extractRefreshToken(data) {
  return (
    data?.refresh_token ||
    data?.refreshToken ||
    data?.data?.refresh_token ||
    null
  );
}

function getTokens() {
  const auth = store.getState().auth;

  return {
    accessToken: auth.accessToken || localStorage.getItem("access_token"),
    refreshToken: auth.refreshToken || localStorage.getItem("refresh_token"),
  };
}

function getErrorMessage(data, fallback) {
  return (
    data?.message ||
    data?.detail ||
    data?.msg ||
    data?.error ||
    fallback
  );
}

async function sendRequest(path, options, accessToken) {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

let refreshPromise = null;

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { refreshToken } = getTokens();

      if (!refreshToken) {
        throw new Error("Session expired. Please login again.");
      }

      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          getErrorMessage(data, "Unable to refresh token")
        );
      }

      const newAccessToken = extractAccessToken(data);

      if (!newAccessToken) {
        throw new Error("Access token not found in refresh response.");
      }

      const newRefreshToken =
        extractRefreshToken(data) || refreshToken;

      store.dispatch(
        setCredentials({
          user: store.getState().auth.user,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
      );

      return newAccessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function authFetch(path, options = {}) {
  const { accessToken } = getTokens();

  if (!accessToken) {
    store.dispatch(logout());
    throw new Error("Please login first.");
  }

  let res = await sendRequest(path, options, accessToken);

  if (res.status === 401) {
    try {
      const newAccessToken = await refreshAccessToken();

      res = await sendRequest(path, options, newAccessToken);
    } catch {
      store.dispatch(logout());
      throw new Error("Session expired. Please login again.");
    }
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      getErrorMessage(data, `Request failed (${res.status})`)
    );
  }

  return data;
}



