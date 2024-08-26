"use client";
import { AxiosResponse, AxiosError } from "axios";
import { httpClientForCredentials } from "@/app/api/utils/api"; // 경로는 실제 파일 구조에 맞게 수정

export interface LoginData {
  email: string;
  password: string;
}

interface Token {
  access: string;
  refresh: string;
}

interface User {
  id: number;
  email: string;
  nickname: string;
}

interface LoginResponse {
  user: User;
  message: string;
  token: Token;
}

interface ErrorResponse {
  message?: string; // message 속성을 선택적으로 변경
}

// Function to set the Authorization headerexport
const setAuthorizationHeader = (access: string) => {
  console.log("Setting Authorization Header with token:", access);

  httpClientForCredentials.defaults.headers.common["Authorization"] =
    `Bearer ${access}`;

  // Log immediately after setting to ensure it is set
  console.log(
    "Authorization Header after setting:",
    httpClientForCredentials.defaults.headers.common["Authorization"],
  );
};

export const onLogInSuccess = (response: AxiosResponse<LoginResponse>) => {
  const { id } = response.data.user;

  // 로그인 성공 후 /detail 페이지로 이동 (user id를 쿼리 파라미터로 전달)
  window.location.href = `/home/${id}`;
};

export const onLogIn = async (params: LoginData) => {
  try {
    const response = await httpClientForCredentials.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_POST_API_URL}/user/auth/`,
      params,
    );
    console.log("로그인 성공:", response);
    if (response.status === 200) {
      const { access } = response.data.token;
      const { id } = response.data.user;

      httpClientForCredentials.defaults.headers.common["Authorization"] =
        `Bearer ${access}`;

      onLogInSuccess(response);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
    console.error("로그인 실패:", errorMessage);
    throw new Error(errorMessage);
  }
};
