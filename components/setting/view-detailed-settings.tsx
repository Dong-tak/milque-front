import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  SettingButton,
  SettingCard,
  SettingSwitch,
  SettingDropDown,
  SettingProfile,
  SettingArrow,
} from "@/components/setting/setting-comp";

export function DetailedSettingsView() {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-y-auto px-8">
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            보기 설정
          </DialogTitle>
        </DialogHeader>
        <SettingDropDown
          title="첫 화면 설정"
          content="어떤 화면을 첫 화면으로 설정할까요?"
          className="h-full w-full"
          dropdownTitle="홈 화면"
        />
        <SettingDropDown
          title="테마"
          content="내가 원하는 테마로 바꾸세요."
          className="h-full w-full"
          dropdownTitle="라이트 모드"
        />
        <SettingDropDown
          title="보기"
          content="계정 로그인에 사용할 비밀번호를 재설정하세요"
          className="h-full w-full"
          dropdownTitle="테이블"
        />
        <SettingDropDown
          title="우선 노출"
          content="닉네임과 이름 중 주요시하는 요소를 고르세요"
          className="h-full w-full"
          dropdownTitle="닉네임"
        />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            언어와 시간
          </DialogTitle>
        </DialogHeader>
        <SettingSwitch
          title="위치를 사용하여 자동으로 설정"
          content="자세한 내용은 쿠키 공지를 확인하세요"
          className="h-full w-full"
        />
        <SettingDropDown
          title="시간대"
          content="나에게 맞는 시간대를 설정하세요"
          className="h-full w-full"
          dropdownTitle="(GMT+09:00) 아시아/서울 (GMT+9)"
        />
        <SettingDropDown
          title="언어"
          content="나에게 맞는 언어를 설정하세요"
          className="h-full w-full"
          dropdownTitle="한국어"
        />
        <SettingDropDown
          title="하루의 시작을 나누는 시간"
          content="하루를 나누는 기준을 설정하세요"
          className="h-full w-full"
          dropdownTitle="오전 6:00"
        />
        <SettingDropDown
          title="한주의 시작을 나누는 시간"
          content="한주를 나누는 기준을 설정하세요"
          className="h-full w-full"
          dropdownTitle="월요일"
        />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            개인정보 보호
          </DialogTitle>
        </DialogHeader>
        <SettingSwitch
          title="쿠키 설정"
          content="자세한 내용은 쿠키 공지를 확인하세요"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
