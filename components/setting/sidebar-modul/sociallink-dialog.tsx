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
import Image from "next/image";

interface SocialLinkDialogProps {
  button: React.ReactNode; // 외부에서 주입받는 버튼
}

export const SocialLinkDialog = ({ button }: SocialLinkDialogProps) => {
  const [step, setStep] = useState(1); // 두 단계로 구성된 다이얼로그 상태
  const [socialAccountId, setSocialAccountId] = useState("");
  const [selectedSocial, setSelectedSocial] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 소셜 계정 선택 단계
  const handleSocialSelect = (social: string) => {
    setSelectedSocial(social); // 소셜 계정 선택
    setStep(2); // 다음 단계로 이동
  };

  // 소셜 계정 인증 처리 로직
  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Social account selected:", selectedSocial);
      console.log("Social account ID:", socialAccountId);
      console.log("Verification code submitted:", verificationCode);

      // 여기에 실제 소셜 인증 처리 로직을 추가
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-40 mb-4 flex justify-between">
            {/* 단계 표시 UI */}
            <div
              className={`mx-1 h-1 flex-1 rounded-lg ${step == 1 ? "bg-primary" : "bg-gray-300"}`}
            ></div>
            <div
              className={`mx-1 h-1 flex-1 rounded-lg ${step == 2 ? "bg-primary" : "bg-gray-300"}`}
            ></div>
          </div>
          <AlertDialogTitle>
            {step === 1 ? "소셜 계정 선택" : "소셜 계정 인증"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {step === 1
              ? "연결할 소셜 계정을 선택하세요."
              : "소셜 계정을 이용하여 인증하세요."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Step 1: 소셜 계정 선택 */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="font-inter relative flex w-full flex-row items-start justify-start gap-4 text-left text-sm text-secondary-foreground">
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => handleSocialSelect("facebook")}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt="Facebook"
                    src="/social-media/icon-facebook.png"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    Facebook
                  </div>
                </Button>
              </div>
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => handleSocialSelect("instagram")}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt="Instagram"
                    src="/social-media/icon-instagram.png"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    Instagram
                  </div>
                </Button>
              </div>
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => handleSocialSelect("twitter")}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt="Twitter"
                    src="/social-media/icon-x-twitter.png"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    Twitter
                  </div>
                </Button>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        )}

        {/* Step 2: 소셜 계정 인증 */}
        {step === 2 && (
          <div className="w-full space-y-5">
            <form
              onSubmit={handleSocialSubmit}
              className="flex w-full justify-center gap-2 space-y-5"
            >
              <div className="flex w-full flex-col space-y-[6px]">
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  소셜 계정 ID 입력
                </Label>
                <Input
                  className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
                  type="text"
                  value={socialAccountId}
                  onChange={(e) => setSocialAccountId(e.target.value)}
                  required
                  placeholder="소셜 계정 ID"
                />
              </div>
              <div className="flex flex-col justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="nline-flex mt-2 h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                >
                  {isLoading ? "로딩 중..." : "보내기"}
                </Button>
              </div>
            </form>

            {/* 인증 코드 입력 폼 */}
            <form
              onSubmit={handleSocialSubmit}
              className="flex w-full justify-center gap-2 space-y-5"
            >
              <div className="flex w-full flex-col space-y-[6px]">
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
                  className="nline-flex mt-2 h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                >
                  {isLoading ? "로딩 중..." : "인증"}
                </Button>
              </div>
            </form>
            <AlertDialogFooter>
              <Button
                className="nline-flex mt-2 items-center justify-center whitespace-nowrap rounded-md border border-input px-4 py-2 transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                onClick={() => setStep(1)}
              >
                뒤로
              </Button>
              <AlertDialogCancel>취소</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SocialLinkDialog;
