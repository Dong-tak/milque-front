"use client";

import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Instagram } from "lucide-react";
import { registerUser } from "./action";

interface FormState {
  fieldErrors?: {
    email?: string;
  };
}

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
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-h-[540px] max-w-[400px] grow items-center justify-center space-y-[16px] border-none bg-background shadow-none sm:w-auto sm:min-w-[343px]">
      <CardHeader className="p-0">
        <CardTitle className="text-center">
          회원가입{isLoading && <span> 로딩 중...</span>}
        </CardTitle>
        <CardDescription className="text-center">
          바로 계정을 연결하세요!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <form
          className="space-y-[6px]"
          onSubmit={handleSubmit(onSubmitRegister)}
        >
          <div className="space-y-[6px]">
            <Label htmlFor="register-email" className="h-10">
              Email
            </Label>
            <Input
              type="email"
              required
              // errors={
              //   state.fieldErrors?.email ? [state.fieldErrors.email] : undefined
              // }
              id="register-email"
              placeholder="name@example.com"
              {...register("email")}
            />
          </div>
          <Button size={"long"} type="submit" disabled={isLoading}>
            이메일로 회원가입
          </Button>
        </form>
      </CardContent>
      <CardContent className="flex items-center p-0">
        <Separator />
        <div className="w-full text-center text-muted-foreground body-normal-body-01">
          OR Login WITH
        </div>
        <Separator />
      </CardContent>
      <CardContent className="space-y-2 p-0">
        <Button variant={"background"} size={"long"} className="gap-2">
          <Github className="h-4 w-4" />
          Github
        </Button>
        <Button variant={"background"} size={"long"} className="gap-2">
          <Instagram className="h-4 w-4" />
          Instagram
        </Button>
      </CardContent>
    </Card>
  );
}
