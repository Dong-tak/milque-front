"use client";
import { httpClientForCredentials } from "@/app/api/axios-header";
import { DataFetchInClient } from "@/components/postdata-client";
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
  data: {
    user: User;
    message: string;
    token: Token;
    access: Token;
    refresh: Token;
  };
}

interface ErrorResponse {
  message?: string; // message 속성을 선택적으로 변경
}

export const onLogInSuccess = (response: LoginResponse) => {
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
  const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/user/auth/`;
  const bodyData = {
    loginId: params.loginId,
    password: params.password,
  };

  const data = await DataFetchInClient({ apiUrl, bodyData });
  if (data) {
    onLogInSuccess(data);
  }
};
