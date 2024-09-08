import React, { FormEvent, useState } from "react";
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

interface DeleteMediaProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const LoadingButton: React.FC<
  { isLoading: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ isLoading, children, ...props }) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? "로딩 중..." : children}
    </Button>
  );
};

export function DeleteMedia({ isOpen, onClose, onDelete }: DeleteMediaProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSocialSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    try {
      console.log("Verification code submitted:", verificationCode);
      if (verificationCode === "해제동의") {
        onDelete();
        onClose(); // 성공 시에만 창을 닫음
      } else {
        setErrorMessage("잘못된 확인 문자입니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>계정 연결을 해제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            소셜 계정을 해제하려면 &quot;해제동의&quot; 문자를 입력하세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full space-y-5">
          <form
            onSubmit={handleSocialSubmit}
            className="flex w-full justify-center gap-2 space-y-5"
          >
            <div className="flex w-full flex-col space-y-[6px]">
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                확인 문자 입력
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="input"
                  placeholder="해제동의"
                />
                <LoadingButton
                  type="submit"
                  className="btn-primary mt-2 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input px-4 py-2 transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                  isLoading={isLoading}
                >
                  확인
                </LoadingButton>
              </div>
              {errorMessage && (
                <span className="text-sm text-red-500">{errorMessage}</span>
              )}
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
