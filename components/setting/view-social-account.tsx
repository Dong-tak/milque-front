import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AccountTable } from "@/components/setting/our-table";
import {
  SettingButton,
  SettingSwitch,
  SettingDropDown,
  SettingArrow,
} from "@/components/setting/setting-comp";

export function SocialAccountView() {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            소셜 계정 관리
          </DialogTitle>
        </DialogHeader>
        <SettingArrow
          title="새로운 소셜 계정 연결하기"
          content="내 활동과 상태를 알립니다."
          className="h-full w-full"
        />
        <SettingButton
          title="소셜 계정 진단하기"
          content="연결된 소셜 계정들의 연결 상태를 진단합니다."
          className="h-full w-full"
          buttonTitle="진단하기"
          onClick={() => console.log("소셜 계정 진단하기")}
        />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          내 소셜 계정
        </DialogTitle>
        <AccountTable
          tableheader_1="미디어"
          tableheader_2="계정"
          tableheader_3="스크랩 수"
          tableheader_4="연결 상태"
        />
      </div>
    </div>
  );
}
