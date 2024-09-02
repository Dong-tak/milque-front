import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Check, CircleAlert } from "lucide-react"; // Check 아이콘을 임포트
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import the 'Cookies' module

interface SettingAlertDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  button: React.ReactNode; //버튼을 외부에서 주입 받도록 추가
}

export const LogoutDialog = ({
  button,
  dialogTitle,
  dialogDescription,
}: SettingAlertDialogProps) => {
  const router = useRouter();

  const handleLogout = () => {
    // 쿠키 초기화
    Cookies.remove("token"); // 예시: 'token' 쿠키를 제거
    Cookies.remove("user"); // 예시: 'user' 쿠키를 제거

    // 홈 화면으로 이동
    router.push("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>돌아가기</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>로그아웃</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
