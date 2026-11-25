import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import {
  registerUser,
  loginUser,
  forgotPassword,
  refreshToken,
} from "../../services/authService";

import { getProfile, saveProfile } from "../../services/profileService";
import {
  extractAccessToken,
  extractRefreshToken,
} from "../../services/apiClient";

import { setCredentials } from "./authSlice";

// Signup Hook
export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// Login Hook
export const useLogin = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      // Purane user ka cache saaf
      queryClient.clear();

      dispatch(
        setCredentials({
          user: data.user || null,
          accessToken: extractAccessToken(data),
          refreshToken: extractRefreshToken(data),
        })
      );
    },
  });
};

// Forgot Password Hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

// Refresh Token Hook
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: ({ refresh_token, access_token }) =>
      refreshToken(refresh_token, access_token),
  });
};

// Get Profile Hook
export const useProfile = (tokenArg) => {
  const reduxToken = useSelector((state) => state.auth?.accessToken);

  const token =
    tokenArg || reduxToken || localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile(),
    enabled: Boolean(token),
  });
};

// Update Profile Hook
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

