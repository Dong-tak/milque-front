"use client";
import { httpClientForCredentials } from "@/app/api/axios-header";
import { AxiosResponse, AxiosError } from "axios";

export interface LoginData {
  loginId: string;
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
  access: Token;
  refresh: Token;
}

interface ErrorResponse {
  message?: string; // message 속성을 선택적으로 변경
}

// Function to set the Authorization headerexport
// const setAuthorizationHeader = (access: string) => {
//   console.log("Setting Authorization Header with token:", access);

//   httpClientForCredentials.defaults.headers.common["Authorization"] =
//     `Bearer ${access}`;

//   // Log immediately after setting to ensure it is set
//   console.log(
//     "Authorization Header after setting:",
//     httpClientForCredentials.defaults.headers.common["Authorization"],
//   );
// };

export const onLogInSuccess = (response: AxiosResponse<LoginResponse>) => {
  console.log("로그인 성공:", response);
  const { id } = response.data.user;
  console.log(id);
  const access = response.data.access;
  const accessToken = access.toString();

  // localStorage.setItem("accessToken", accessToken);
  // document.cookie = `accessToken=${accessToken}; path=/; SameSite=Lax`;

  // 로그인 성공 후 /detail 페이지로 이동 (user id를 쿼리 파라미터로 전달)
  window.location.href = `/home/${id}`;
};

export const onLogIn = async (params: LoginData) => {
  try {
    // 환경 변수 전체 출력
    console.log("All ENV Variables:", process.env);

    // NEXT_PUBLIC_POST_API_URL 값 출력
    console.log(
      "API URL:",
      `${process.env.NEXT_PUBLIC_POST_API_URL}/user/auth/`,
    );
    const response = await httpClientForCredentials.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_POST_API_URL}/user/auth/`,
      params,
    );
    console.log("로그인 성공:", response);
    if (response.status === 200) {
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
