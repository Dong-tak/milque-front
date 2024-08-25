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

export function NotificationView() {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            내 알림
          </DialogTitle>
        </DialogHeader>
        <AccountTable
          tableheader_1="알림 유형"
          tableheader_2="알림 내용"
          tableheader_3=""
          tableheader_4="알림 시간"
          arrowupdown_1={true}
          arrowupdown_2={true}
          arrowupdown_3={false}
          arrowupdown_4={true}
        />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          내 소셜 계정
        </DialogTitle>
      </div>
    </div>
  );
}
