"use server";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { redirect } from "next/navigation";
import { boolean, z } from "zod";

const PASSWORD_MIN_LENGTH = 8;
const POST_API_URL = process.env.POST_API_URL;
const JWT_SECRET = process.env.JWT_SECRET ?? "default-secret";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ?? "default-refresh-secret";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // 사용자 인증 (예: 데이터베이스에서 사용자 검색 및 비밀번호 검증)
      const user = await fetchUserByEmail(email); // 사용자 검색 함수
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword,
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // JWT 토큰 생성
      const accessToken = sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "15m",
      });

      const refreshToken = sign(
        { id: user.id, email: user.email },
        JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );

      // 쿠키에 JWT 토큰 설정
      res.setHeader("Set-Cookie", [
        serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 900, // 15분
          path: "/",
        }),
        serialize("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 604800, // 7일
          path: "/",
        }),
      ]);

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// 사용자 검색 함수 (예시)
async function fetchUserByEmail(email: string) {
  // 실제 구현에서는 데이터베이스에서 사용자 정보를 검색해야 합니다.
  // 여기서는 예시로 하드코딩된 사용자 정보를 반환합니다.
  if (email === "test@example.com") {
    return {
      id: 1,
      email: "test@example.com",
      hashedPassword: await bcrypt.hash("password123", 10),
    };
  }
  return null;
}
const checkUsername = (username: string) => !username.includes("potato");

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Username은 문자만 가능합니다!",
      required_error: "문자를 입력해",
    })
    .min(3, "3글자 이상 이름을 사용해주세요!")
    .trim()
    .toLowerCase()
    //.transform((username) => `♥${username}♥`)
    .refine(checkUsername, "potato는 사용 가능한 이름이 아닙니다."),
  // superrefine 해야함
  email: z.string().email().trim().toLowerCase(), // superrefine 해야함,
  password: z.string().min(PASSWORD_MIN_LENGTH),
  //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
});
