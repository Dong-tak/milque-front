"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ErrorView() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] =
    useState("알 수 없는 오류가 발생했습니다.");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      const message = query.get("message");
      if (message) {
        setErrorMessage(message);
      }
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">오류 발생</CardTitle>
          <CardDescription className="text-center text-red-500">
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => router.push("/login")}>
            로그인 페이지로 돌아가기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
