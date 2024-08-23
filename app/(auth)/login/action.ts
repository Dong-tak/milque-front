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

export const onLogInSuccess = (response: AxiosResponse<LoginResponse>) => {
  const { access } = response.data.token;
  const { id } = response.data.user;

  // AccessToken을 기본 헤더에 설정
  httpClientForCredentials.defaults.headers.common["Authorization"] =
    `Bearer ${access}`;

  // 로그인 성공 후 /detail 페이지로 이동 (user id를 쿼리 파라미터로 전달)
  window.location.href = `/`;
};

export const onLogIn = async (params: LoginData) => {
  try {
    const response = await httpClientForCredentials.post<LoginResponse>(
      "/user/auth/",
      params,
    );
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

export const onSilentRefresh = async () => {
  try {
    const response = await httpClientForCredentials.post<LoginResponse>(
      "/user/auth/refresh/",
    );
    if (response.status === 200) {
      // AccessToken을 변수로 저장
      onLogInSuccess(response);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.status === 401) {
      // RefreshToken 만료 - 로그인 페이지로 이동
      window.location.href = "/login";
    } else {
      const errorMessage =
        axiosError.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
      console.error("토큰 갱신 실패:", errorMessage);
      throw new Error(errorMessage);
    }
  }
};
