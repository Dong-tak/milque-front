import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, Check } from "lucide-react";

interface SettingAlertDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  buttonClassName?: string;
  button: React.ReactNode; //버튼을 외부에서 주입 받도록 추가
}

export const PasswordDialog = ({
  button,
  dialogTitle,
  dialogDescription,
}: SettingAlertDialogProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false); // 성공 메시지 다이얼로그 상태 추가

  const handlePasswordChange = async () => {
    // 현재 비밀번호 확인
    const isCurrentPasswordValid = await checkCurrentPassword(currentPassword);
    if (!isCurrentPasswordValid) {
      setErrorMessage("현재 비밀번호가 일치하지 않습니다");
      return false;
    }

    // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return false;
    }

    // 비밀번호 변경 요청
    const isPasswordChanged = await changePassword(newPassword);
    if (isPasswordChanged) {
      setErrorMessage(""); // 비밀번호 변경 성공 시 경고 메시지 초기화
      setIsDialogOpen(false); // 비밀번호 변경 성공 시 창 닫기
      setIsSuccessDialogOpen(true); // 성공 메시지 다이얼로그 열기
      return true;
    } else {
      setErrorMessage("비밀번호 변경에 실패했습니다");
      return false;
    }
  };

  const checkCurrentPassword = async (password: string) => {
    // 임의의 비밀번호를 하드코딩하여 비교
    const hardcodedPassword = "current_password_db";
    return password === hardcodedPassword;
  };

  const changePassword = async (newPassword: string) => {
    // 서버에 비밀번호 변경 요청
    // 예시: 실제 구현에서는 API 요청을 보냄
    return true;
  };

  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-full space-y-5">
            <div className="space-y-[6px]">
              <div>
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  현재 비밀번호 입력
                </Label>
              </div>
              <div className="relative">
                <Input
                  className="font-['SUIT Variable'] shrink grow basis-0 pr-10 text-sm font-normal leading-tight text-slate-400"
                  placeholder="현재 비밀번호"
                  type={showPassword1 ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  onMouseDown={() => setShowPassword1(true)}
                  onMouseUp={() => setShowPassword1(false)}
                  onMouseLeave={() => setShowPassword1(false)}
                >
                  <Eye size={20} className="text-slate-400" />
                </div>
              </div>
            </div>
            <div className="space-y-[6px]">
              <div>
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  새 비밀번호 입력
                </Label>
              </div>
              <div className="relative">
                <Input
                  className="font-['SUIT Variable'] shrink grow basis-0 pr-10 text-sm font-normal leading-tight text-slate-400"
                  placeholder="새 비밀번호"
                  type={showPassword2 ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  onMouseDown={() => setShowPassword2(true)}
                  onMouseUp={() => setShowPassword2(false)}
                  onMouseLeave={() => setShowPassword2(false)}
                >
                  <Eye size={20} className="text-slate-400" />
                </div>
              </div>
            </div>
            <div className="space-y-[6px]">
              <div>
                <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                  새 비밀번호 확인
                </Label>
              </div>
              <div className="relative">
                <Input
                  className="font-['SUIT Variable'] shrink grow basis-0 pr-10 text-sm font-normal leading-tight text-slate-400"
                  placeholder="비밀번호 확인"
                  type={showPassword3 ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  onMouseDown={() => setShowPassword3(true)}
                  onMouseUp={() => setShowPassword3(false)}
                  onMouseLeave={() => setShowPassword3(false)}
                >
                  <Eye size={20} className="text-slate-400" />
                </div>
              </div>
            </div>
            {errorMessage && (
              <div className="text-sm text-red-500">{errorMessage}</div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault(); // 기본 동작 막기
                event.stopPropagation(); // 이벤트 전파 막기
                const isPasswordChanged = await handlePasswordChange();
                if (!isPasswordChanged) {
                  setIsDialogOpen(true); // 비밀번호 변경 실패 시 창이 닫히지 않도록 함
                }
              }}
            >
              비밀번호 변경
            </AlertDialogAction>
            <AlertDialogCancel>취소</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 성공 메시지 다이얼로그 */}
      <AlertDialog
        open={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Check className="text-green-600" /> 비밀번호가 변경되었습니다.
            </AlertDialogTitle>
            <AlertDialogDescription>
              비밀번호가 저장되었습니다. 변경된 비밀번호로 로그인해주세요.
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
