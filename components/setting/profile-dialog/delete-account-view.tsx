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

interface SettingAlertDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  buttonClassName?: string;
  button: React.ReactNode; //버튼을 외부에서 주입 받도록 추가
}

export const DeleteAccountDialog = ({
  button,
  dialogTitle,
  dialogDescription,
}: SettingAlertDialogProps) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false); // 성공 메시지 다이얼로그 상태 추가

  const handleAccountDeletion = async () => {
    // 이메일 확인
    const isEmailValid = await checkEmail(email);
    if (!isEmailValid) {
      setErrorMessage("이메일이 일치하지 않습니다");
      return false;
    }

    // 계정 삭제 요청
    const isAccountDeleted = await deleteAccount();
    if (isAccountDeleted) {
      setErrorMessage(""); // 계정 삭제 성공 시 경고 메시지 초기화
      setIsDialogOpen(false); // 계정 삭제 성공 시 창 닫기
      setIsSuccessDialogOpen(true); // 성공 메시지 다이얼로그 열기
      return true;
    } else {
      setErrorMessage("계정 삭제에 실패했습니다");
      return false;
    }
  };

  const checkEmail = async (email: string) => {
    // 임의의 이메일을 하드코딩하여 비교
    const hardcodedEmail = "user@example.com";
    return email === hardcodedEmail;
  };

  const deleteAccount = async () => {
    // 서버에 계정 삭제 요청
    // 예시: 실제 구현에서는 API 요청을 보냄
    return true;
  };

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-3">
              {dialogTitle}
            </AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-full space-y-5">
            <div className="space-y-[6px]">
              <div>
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  이메일 입력
                </Label>
              </div>
              <div className="relative">
                <Input
                  className="font-['SUIT Variable'] shrink grow basis-0 pr-10 text-sm font-normal leading-tight text-slate-400"
                  placeholder="user@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="text-sm text-red-500">{errorMessage}</div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={async (event) => {
                event.preventDefault(); // 기본 동작 막기
                event.stopPropagation(); // 이벤트 전파 막기
                const isAccountDeleted = await handleAccountDeletion();
                if (!isAccountDeleted) {
                  setIsDialogOpen(true); // 계정 삭제 실패 시 창이 닫히지 않도록 함
                }
              }}
            >
              계정 삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 성공 메시지 다이얼로그 */}
      <AlertDialog
        open={isSuccessDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsDialogOpen(false);
            setIsSuccessDialogOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              계정이 삭제되었습니다.
            </AlertDialogTitle>
            <AlertDialogDescription>
              계정이 성공적으로 삭제되었습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setIsDialogOpen(false);
                setIsSuccessDialogOpen(false);
              }}
            >
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteAccountDialog;
