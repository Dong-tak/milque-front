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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function UpdateMedia({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialAccountId, setSocialAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isPasswordValid = await checkPassword(password);
    if (isPasswordValid) {
      setErrorMessage("");
    } else {
      setErrorMessage("비밀번호가 틀렸습니다.");
    }
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(
        "Social account verification requested for:",
        socialAccountId,
      );
      console.log("Verification code submitted:", verificationCode);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPassword = async (password: string) => {
    const hardcodedPassword = "1";
    return password === hardcodedPassword;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>소셜 계정 수정</AlertDialogTitle>
          <AlertDialogDescription>
            소셜 계정을 수정하려면 다시 추가할 계정의 인증 필요합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full space-y-5">
          <form
            onSubmit={handleSocialSubmit}
            className="flex w-full justify-center gap-2 space-y-5"
          >
            <div className="flex w-full flex-col space-y-[6px]">
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                소셜 계정 입력
              </Label>
              <Input
                className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
                type="text"
                value={socialAccountId}
                onChange={(e) => setSocialAccountId(e.target.value)}
                required
                placeholder="name"
              />
            </div>
            <div className="flex flex-col justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
              >
                {isLoading ? "로딩 중..." : "보내기"}
              </Button>
            </div>
          </form>
          <form
            onSubmit={handleSocialSubmit}
            className="flex w-full justify-center gap-2 space-y-5"
          >
            <div className="flex w-full flex-col justify-end space-y-[6px]">
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                인증 코드 입력
              </Label>
              <Input
                className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
                placeholder="Code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
              >
                {isLoading ? "로딩 중..." : "인증"}
              </Button>
            </div>
          </form>
        </div>
        <AlertDialogFooter>
          <Button
            className="mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input px-4 py-2 transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
            onClick={onClose}
          >
            뒤로
          </Button>
          <AlertDialogCancel>취소</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
