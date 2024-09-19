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
  SettingSwitch,
  SettingDropDown,
  SettingProfile,
  SettingArrow,
} from "@/components/setting/setting-comp";
import { useState } from "react";

export function DetailedSettingsView() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // onCheckedChange 함수 정의
  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchOn(checked);
  };
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
          value="home" // 기본 선택된 값을 설정해야 합니다.
          menulabel="첫 화면 설정"
          radioItems={[
            { label: "홈 화면", value: "home" },
            { label: "팀 화면", value: "team" },
            { label: "탐색 화면", value: "explore" },
          ]}
        />
        <SettingDropDown
          title="테마"
          content="내가 원하는 테마로 바꾸세요."
          className="h-full w-full"
          dropdownTitle="시스템 설정 사용"
          value="use system setting" // 기본 선택된 값을 설정해야 합니다.
          menulabel="테마 설정"
          radioItems={[
            { label: "라이트 모드", value: "light mode" },
            { label: "다크 모드", value: "drak mode" },
            { label: "시스템 설정 사용", value: "use system setting" },
          ]}
        />
        <SettingDropDown
          title="보기"
          content="계정 로그인에 사용할 비밀번호를 재설정하세요"
          className="h-full w-full"
          dropdownTitle="테이블"
          value="table" // 기본 선택된 값을 설정해야 합니다.
          menulabel="보기 설정"
          radioItems={[
            { label: "그리드", value: "grid" },
            { label: "테이블", value: "table" },
          ]}
          disabled={true}
        />
        <SettingDropDown
          title="우선 노출"
          content="닉네임과 이름 중 주요시하는 요소를 고르세요"
          className="h-full w-full"
          dropdownTitle="닉네임"
          value="nickname" // 기본 선택된 값을 설정해야 합니다.
          menulabel="우선 노출 설정"
          radioItems={[
            { label: "닉네임", value: "nickname" },
            { label: "이름", value: "name" },
          ]}
          disabled={true}
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
          onCheckedChange={handleSwitchChange}
        />
        <SettingDropDown
          title="시간대"
          content="나에게 맞는 시간대를 설정하세요"
          className="h-full w-full"
          dropdownTitle="(GMT+09:00) 아시아/서울 (GMT+9)"
          value="nickname" // 변경된 값을 넣어야 합니다.
          menulabel="우선 노출 설정"
          radioItems={[
            { label: "닉네임", value: "nickname" },
            { label: "이름", value: "name" },
          ]}
          disabled={isSwitchOn}
        />
        <SettingDropDown
          title="언어"
          content="나에게 맞는 언어를 설정하세요"
          className="h-full w-full"
          dropdownTitle="한국어"
          value="nickname" // 변경된 값을 넣어야 합니다.
          menulabel="우선 노출 설정"
          radioItems={[
            { label: "닉네임", value: "nickname" },
            { label: "이름", value: "name" },
          ]}
          disabled={isSwitchOn}
        />
        <SettingDropDown
          title="하루의 시작을 나누는 시간"
          content="하루를 나누는 기준을 설정하세요"
          className="h-full w-full"
          dropdownTitle="오전 6:00"
          value="nickname" // 변경된 값을 넣어야 합니다.
          menulabel="우선 노출 설정"
          radioItems={[
            { label: "닉네임", value: "nickname" },
            { label: "이름", value: "name" },
          ]}
        />
        <SettingDropDown
          title="한주의 시작을 나누는 시간"
          content="한주를 나누는 기준을 설정하세요"
          className="h-full w-full"
          dropdownTitle="월요일"
          value="nickname" // 변경된 값을 넣어야 합니다.
          menulabel="우선 노출 설정"
          radioItems={[
            { label: "닉네임", value: "nickname" },
            { label: "이름", value: "name" },
          ]}
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
