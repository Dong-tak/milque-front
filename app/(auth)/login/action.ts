// app/(auth)/login/action.ts

import { AxiosResponse, AxiosError } from "axios";
import { httpClientForCredentials } from "@/app/api/utils/api";
import type { LoginData, LoginResponse, ErrorResponse } from "./types";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.NEXT_PUBLIC_POST_API_URL;

export const onLogIn = async (
  params: LoginData,
  navigate: (path: string) => void,
) => {
  try {
    const response = await httpClientForCredentials.post<LoginResponse>(
      `${API_URL}/user/auth/`,
      params,
    );
    if (response.status === 200) {
      const { access } = response.data.token;
      const { id } = response.data.user;

      httpClientForCredentials.defaults.headers.common["Authorization"] =
        `Bearer ${access}`;

      navigate(`/${id}`);
    }
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const errorMessage =
      axiosError.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
    console.error("로그인 실패:", errorMessage);
    throw new Error(errorMessage);
  }
};

export type { LoginData }; // LoginData 타입을 내보냄
