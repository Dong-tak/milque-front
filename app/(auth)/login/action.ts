"use server";

import dotenv from "dotenv";
import { z } from "zod";
import bcrypt from "bcryptjs";

dotenv.config();

const POST_API_URL = process.env.POST_API_URL;

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(async (email) => {
      const response = await fetch(`${POST_API_URL}/user/auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (
          response.status === 400 &&
          data.error === "This email is already registered."
        ) {
          return false;
        }
        return true;
      } else if (contentType && contentType.includes("text/html")) {
        console.error(
          "Received HTML response instead of JSON:",
          await response.text(),
        );
        return false;
      } else {
        console.error("Unexpected response format:", contentType);
        return false;
      }
    }, "이 이메일을 사용하는 계정이 존재하지 않습니다."),
  password: z.string({
    required_error: "비밀번호를 입력하세요.",
  }),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const response = await fetch(`${POST_API_URL}/user/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error:
          errorData.message ||
          "로그인 실패. 이메일 또는 비밀번호를 확인하세요.",
      };
    }

    const user = await response.json();
    const ok = await bcrypt.compare(
      result.data.password,
      user.password ?? "xxxx",
    );

    if (!ok) {
      return {
        error: "비밀번호가 일치하지 않습니다.",
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }

    // 로그인 성공 처리
    return { success: true, user };
  }
}
