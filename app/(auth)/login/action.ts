"use server";

import axios from "axios";
import Cookies from "js-cookie";
import dotenv from "dotenv";

dotenv.config();
const POST_API_URL = process.env.POST_API_URL;

interface LoginData {
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

export async function login(formData: FormData | null): Promise<void> {
  if (!formData) {
    throw new Error("Form data is null or undefined");
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email or password is missing");
  }

  const loginData: LoginData = { email, password };

  try {
    const response = await axios.post<LoginResponse>(
      "/v1/user/auth/",
      loginData,
    );

    const { token } = response.data;

    // 토큰을 쿠키에 저장 (HttpOnly 쿠키를 사용하면 보안이 강화됨)
    Cookies.set("access_token", token.access, { expires: 1 });
    Cookies.set("refresh_token", token.refresh, { expires: 7 });

    // 로그인 성공 후 다른 페이지로 리디렉션
    window.location.href = "/dashboard"; // 예시로 대시보드 페이지로 이동
  } catch (error) {
    console.error("로그인 실패:", error);
    alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
  }
}
