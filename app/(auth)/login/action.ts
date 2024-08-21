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

export const onLogInSuccess = (response: AxiosResponse) => {
  const { access } = response.data.token;
  // AccessToken을 기본 헤더에 설정
  httpClientForCredentials.defaults.headers.common["Authorization"] =
    `Bearer ${access}`;
};

export const onLogIn = async (params: LoginData) => {
  try {
    const response = await httpClientForCredentials.post("/user/auth/", params);
    if (response.status === 200) {
      onLogInSuccess(response);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("로그인 실패:", axiosError.response?.data);
  }
};

export const onSilentRefresh = async () => {
  try {
    const response = await httpClientForCredentials.post("/user/auth/refresh/");
    if (response.status === 200) {
      // AccessToken을 변수로 저장
      onLogInSuccess(response);
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // RefreshToken 만료 - 로그인 페이지로 이동
      window.location.href = "/login";
    }
  }
};
