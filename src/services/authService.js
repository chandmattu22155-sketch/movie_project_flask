import { BASE_URL } from "./apiClient";

const baseHeaders = {
  "Content-Type": "application/json",
};

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.message ||
      data.detail ||
      data.msg ||
      data.error ||
      `Request failed (${res.status})`
    );
  }

  return data;
}

export async function registerUser({ name, email, password }) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  return handleResponse(res);
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return handleResponse(res);
}

export async function refreshToken(refresh_token) {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });

  return handleResponse(res);
}

export async function forgotPassword({
  email,
  current_password,
  password,
}) {
  const res = await fetch(`${BASE_URL}/auth/forget`, {
    method: "POST",
    headers: baseHeaders,
    body: JSON.stringify({
      email,
      current_password,
      password,
    }),
  });

  return handleResponse(res);
}

export function logoutUser() {
  localStorage.removeItem("auth");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
