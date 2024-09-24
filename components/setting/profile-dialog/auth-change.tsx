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
import {
  MessageCircle,
  Mail,
  Facebook,
  Instagram,
  Ellipsis,
  MessagesSquare,
  Check,
  SquareAsterisk,
} from "lucide-react";
import { registerUser } from "@/app/(auth)/signup/action";

interface SettingAlertDialogProps {
  button: React.ReactNode; //버튼을 외부에서 주입 받도록 추가
}

export const ChangeAuthDialog = ({ button }: SettingAlertDialogProps) => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [socialAccountId, setSocialAccountId] = useState("");
  const [selectedSocial, setSelectedSocial] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isPasswordValid = await checkPassword(password);
    if (isPasswordValid) {
      setStep(2);
      setErrorMessage("");
    } else {
      setErrorMessage("비밀번호가 틀렸습니다.");
    }
  };
  // 소셜 계정 인증 요청 처리 로직
  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(
        "Social account verification requested for:",
        socialAccountId,
      );

      // 인증 코드 검증 로직
      console.log("Verification code submitted:", verificationCode);
    } finally {
      setIsLoading(false);
    }
  };

  const checkPassword = async (password: string) => {
    // 임의의 비밀번호를 하드코딩하여 비교
    const hardcodedPassword = "1";
    return password === hardcodedPassword;
  };

  // 이메일 인증 요청 처리 로직
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await registerUser(email);
      if (result.success) {
        console.log("Verification code sent");
      } else {
        console.log("Verification code not sent");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 문자 인증 요청 처리 로직
  const handleSmsAndVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("SMS verification code sent");

      // 인증 코드 검증 로직 추가
      console.log("Verification code submitted:", verificationCode);
    } finally {
      setIsLoading(false);
    }
  };
  //
  const handleSocialSelect = (social: string) => {
    setSelectedSocial(social);
    setStep(4);
  };

  // 소셜 계정 선택 단계
  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    const footerClicked = [false, false]; // Declare the 'isClicked' variable
    if (method === "sms" || method === "email" || method === "social") {
      setStep(3);
    } else {
      setStep(4);
    }
  };
  let dialogTitle = "";
  let dialogDescription = "";
  const method = selectedMethod;

  //본인 확인 단계
  if (step === 1) {
    dialogTitle = "비밀번호 확인";
    dialogDescription = "본인 확인을 위해 비밀번호를 입력하세요.";
    // 인증 수단 선택 단계
  } else if (step === 2) {
    dialogTitle = "인증 수단 선택";
    dialogDescription = "변경할 인증 수단을 선택하세요.";
    // 문자 인증
  } else if (step === 3 && method === "sms") {
    dialogTitle = "문자 인증";
    dialogDescription = "인증 코드를 입력하세요.";
    // 이메일 인증
  } else if (step === 3 && method === "email") {
    dialogTitle = "이메일 인증";
    dialogDescription = "인증 코드를 입력하세요.";
    // 소셜 계정 선택
  } else if (step === 3 && method === "social") {
    dialogTitle = "소셜 계정 선택";
    dialogDescription = "원하는 소셜 계정을 선택하세요.";
    // 소셜 계정 인증
  } else if (step === 4) {
    dialogTitle = "소셜 계정 인증";
    dialogDescription = "소셜 계정을 이용하여 인증하세요.";
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="mx-32 mb-4 flex justify-between">
            <div
              className={`mx-1 h-1 flex-1 rounded-lg ${step == 1 ? "bg-primary" : "bg-gray-300"}`}
            ></div>
            <div
              className={`mx-1 h-1 flex-1 rounded-lg ${step == 2 ? "bg-primary" : "bg-gray-300"}`}
            ></div>
            <div
              className={`mx-1 h-1 flex-1 rounded-lg ${step == 3 ? "bg-primary" : "bg-gray-300"}`}
            ></div>
            <div
              className={`mx-1 h-1 flex-1 rounded-lg ${step == 4 ? "bg-primary" : "bg-gray-300"}`}
            ></div>
          </div>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>

        {/* 비밀번호 확인 본인 확인 단계 */}
        {step === 1 && (
          <form onSubmit={handlePasswordSubmit} className="w-full space-y-5">
            <div className="space-y-[6px]">
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                현재 비밀번호 입력
              </Label>
              <Input
                className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
                placeholder="현재 비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <div className="text-sm text-red-500">{errorMessage}</div>
              )}
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <Button type="submit">확인</Button>
            </AlertDialogFooter>
          </form>
        )}

        {/* 인증 방법 선택 */}
        {step === 2 && (
          <div className="w-full space-y-5">
            <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
              3가지 인증 방법 중 하나를 선택하세요.
            </Label>
            <div className="flex gap-2">
              <div className="font-inter relative flex w-full flex-row items-start justify-start gap-4 text-left text-sm text-secondary-foreground">
                <div
                  className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                  onClick={() => handleMethodSelect("sms")}
                >
                  <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                    <MessageCircle
                      className={`relative h-6 w-6 shrink-0 overflow-hidden text-slate-500`}
                    />
                    <div
                      className={`relative font-medium leading-[20px] text-slate-500`}
                    >
                      문자 인증
                    </div>
                  </Button>
                </div>
                <div
                  className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                  onClick={() => handleMethodSelect("email")}
                >
                  <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:border-slate-900 hover:bg-background">
                    <Mail className="relative h-6 w-6 shrink-0 overflow-hidden text-slate-500" />
                    <div
                      className={`relative font-medium leading-[20px] text-slate-500`}
                    >
                      메일 인증
                    </div>
                  </Button>
                </div>
                <div
                  className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                  onClick={() => handleMethodSelect("social")}
                >
                  <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                    <div className="flex items-center gap-1">
                      <SquareAsterisk className="relative h-6 w-6 shrink-0 overflow-hidden text-slate-500" />
                    </div>
                    <div
                      className={`relative font-medium leading-[20px] text-slate-500`}
                    >
                      소셜 계정 인증
                    </div>
                  </Button>
                </div>
              </div>
            </div>
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

        {/* 문자 인증 */}
        {step === 3 && selectedMethod === "sms" && (
          <div className="w-full space-y-5">
            <form
              onSubmit={handleSmsAndVerificationSubmit}
              className="flex w-full justify-center gap-2 space-y-5"
            >
              <div className="flex w-full flex-col space-y-[6px]">
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  전화번호 입력
                </Label>
                <Input
                  className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
                  type="tel"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="010-1234-5678"
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
            <form
              onSubmit={handleSmsAndVerificationSubmit}
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
                  className="nline-flex mt-2 h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                >
                  {isLoading ? "로딩 중..." : "인증"}
                </Button>
              </div>
            </form>
            <AlertDialogFooter>
              <Button
                className="nline-flex mt-2 items-center justify-center whitespace-nowrap rounded-md border border-input px-4 py-2 transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                onClick={() => setStep(2)}
              >
                뒤로
              </Button>
              <AlertDialogCancel>취소</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        )}

        {/* 이메일 인증 */}
        {step === 3 && selectedMethod === "email" && (
          <div className="w-full space-y-5">
            <form
              onSubmit={handleEmailSubmit}
              className="flex w-full justify-center gap-2 space-y-5"
            >
              <div className="flex w-full flex-col space-y-[6px]">
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  이메일 입력
                </Label>
                <Input
                  className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="user@example.com"
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
            <form
              onSubmit={handleEmailSubmit}
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
                  className="nline-flex mt-2 h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                >
                  {isLoading ? "로딩 중..." : "인증"}
                </Button>
              </div>
            </form>
            <AlertDialogFooter>
              <Button
                className="nline-flex mt-2 items-center justify-center whitespace-nowrap rounded-md border border-input px-4 py-2 transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                onClick={() => setStep(2)}
              >
                뒤로
              </Button>
              <AlertDialogCancel>취소</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        )}

        {/* 소셜 인증 매체 선택 */}
        {step === 3 && selectedMethod === "social" && (
          <div className="space-y-4">
            <div className="font-inter relative flex w-full flex-row items-start justify-start gap-4 text-left text-sm text-secondary-foreground">
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("facebook");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="social-media/icon-Facebook.svg"
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
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("instagram");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="social-media/icon-instagram.svg"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    instagram
                  </div>
                </Button>
              </div>
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("whatsapp");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="social-media/icon-whats-app.svg"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    WhatsApp
                  </div>
                </Button>
              </div>
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("twitter");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="/social-media/icon-x-twitter.png"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    (X) Twitter
                  </div>
                </Button>
              </div>
            </div>
            <div className="font-inter relative flex w-full flex-row items-start justify-start gap-4 text-left text-sm text-secondary-foreground">
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("Discord");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="/social-media/icon-discord.png"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    Discord
                  </div>
                </Button>
              </div>
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("linkedin");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className={`relative h-6 w-6 shrink-0 overflow-hidden`}
                    alt=""
                    src="/social-media/icon-linkedin.png"
                    height={24}
                    width={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    linkedin
                  </div>
                </Button>
              </div>
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("youtube");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="/social-media/icon-youtube.png"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    Youtube
                  </div>
                </Button>
              </div>
              <div
                className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] border-solid border-slate-300 bg-card px-0`}
                onClick={() => {
                  setStep(4);
                  handleSocialSelect("tiktok");
                }}
              >
                <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                  <Image
                    className="relative h-6 w-6 shrink-0 overflow-hidden"
                    alt=""
                    src="/social-media/icon-tiktok.png"
                    width={24}
                    height={24}
                  />
                  <div
                    className={`relative font-medium leading-[20px] text-slate-500`}
                  >
                    Tiktoc
                  </div>
                </Button>
              </div>
            </div>
            <AlertDialogFooter>
              <Button
                className="nline-flex mt-2 items-center justify-center whitespace-nowrap rounded-md border border-input px-4 py-2 transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                onClick={() => setStep(2)}
              >
                뒤로
              </Button>
              <AlertDialogCancel>취소</AlertDialogCancel>
            </AlertDialogFooter>
          </div>
        )}

        {/* 소셜 인증 마지막 단계 */}
        {step === 4 && (
          <div className="w-full space-y-5">
            <form
              onSubmit={handleSocialSubmit}
              className="flex w-full justify-center gap-2 space-y-5"
            >
              <div className="flex w-full flex-col space-y-[6px]">
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  소샬 계정 입력
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
                  className="nline-flex mt-2 h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                >
                  {isLoading ? "로딩 중..." : "보내기"}
                </Button>
              </div>
            </form>
            {/* 소셜 계정 인증 코드 입력 */}
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
                  className="nline-flex mt-2 h-[36px] items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-secondary-foreground transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                >
                  {isLoading ? "로딩 중..." : "인증"}
                </Button>
              </div>
            </form>
            <AlertDialogFooter>
              <Button
                className="nline-flex mt-2 items-center justify-center whitespace-nowrap rounded-md border border-input px-4 py-2 transition-colors others-medium-button hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 sm:mt-0"
                onClick={() => setStep(3)}
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

export default ChangeAuthDialog;
