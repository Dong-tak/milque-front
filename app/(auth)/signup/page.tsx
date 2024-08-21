"use client";

import { useState, useEffect } from "react";
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
import { onLogIn, onSilentRefresh } from "@/app/(auth)/login/action";
import { PASSWORD_MIN_LENGTH } from "@/lib/auth/constant";

export default function Signup() {
  const [state, setState] = useState<FormState>({ fieldErrors: {} });
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 변수 추가
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmitRegister = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const result = await registerUser(data.email as string);
      if (result.success) {
        // 회원가입 성공 시 인증 페이지로 이동
        router.push("/verify");
      } else {
        // 회원가입 실패 시 오류 메시지 표시
        setState({ fieldErrors: { email: result.error } });
        console.log("회원가입 실패");
      }
    } finally {
      setIsLoading(false);
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
