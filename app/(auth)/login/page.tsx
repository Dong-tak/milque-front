"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Instagram } from "lucide-react";
import Link from "next/link";
import { onLogIn } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/lib/auth/constant";
import { LoginData } from "./action";
import { useRouter } from "next/navigation";
import { getCookie } from "@/components/cookie";

const convertFormDataToLoginData = (formData: FormData): LoginData => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  return { email, password };
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 오류 메시지 상태 추가
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const loginData: LoginData = convertFormDataToLoginData(formData);

    try {
      await onLogIn(loginData);
      // router.push("/"); // 로그인 성공 시 홈 페이지로 이동
    } catch (err) {
      const errorMessage = (err as Error).message; // 명시적 형변환
      setError("로그인 실패: " + errorMessage); // 오류 메시지 설정
      console.error("Login failed", errorMessage);
    }
  };

  return (
    <Card className="max-h-[540px] max-w-[400px] grow items-center justify-center space-y-[16px] border-none bg-background shadow-none sm:w-auto sm:min-w-[343px]">
      <CardHeader className="p-0">
        <CardTitle className="h-auto w-full text-center">로그인</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="h-auto w-full space-y-4 p-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-[6px]">
            <Label htmlFor="email" className="h-10">
              Email
            </Label>
            <Input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-[6px]">
            <Label htmlFor="password" className="h-10">
              Password
            </Label>
            <Input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}{" "}
          {/* 오류 메시지 표시 */}
          <Button size={"long"} type="submit">
            Login
          </Button>
        </form>
      </CardContent>
      <CardContent className="flex h-auto w-full items-center p-0">
        <Separator />
        <div className="w-full text-center text-muted-foreground body-normal-body-01">
          OR Login WITH
        </div>
        <Separator />
      </CardContent>
      <CardContent className="h-auto w-full space-y-2 p-0">
        <Button variant={"background"} size={"long"} className="gap-2">
          <Github className="h-4 w-4" />
          GitHub
        </Button>
        <Button variant={"background"} size={"long"} className="gap-2">
          <Instagram className="h-4 w-4" />
          Instagram
        </Button>
      </CardContent>
      <CardContent className="flex h-auto w-full items-center justify-center py-6">
        <div>Don&apos;t have an account?&nbsp;&nbsp;</div>
        <Link
          href={"/signup"}
          className="flex underline underline-offset-2 hover:scale-105 hover:opacity-60"
        >
          Sign up
        </Link>
      </CardContent>
    </Card>
  );
}
