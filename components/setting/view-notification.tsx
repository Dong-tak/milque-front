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
import { NewTag } from "../our-status-tag";

const invoices = [
  {
    type: (
      <div className="flex justify-start gap-[10px]">
        활동 알림 <NewTag />
      </div>
    ),
    content: (
      <div>
        <p className="m-0 font-semibold">어쩌구저쩌구를 외 5개의 스크랩</p>
        <p>어쩌구저쩌구를 외 5개의 스크랩</p>
      </div>
    ),
    button: "$250.00",
    time: "Credit Card",
  },
  {
    type: (
      <div className="flex justify-start gap-[10px]">
        활동 알림 <NewTag />
      </div>
    ),
    content: "Pending",
    button: "$150.00",
    time: "PayPal",
  },
  {
    type: "업데이트",
    content: "Unpaid",
    button: "$350.00",
    time: "Bank Transfer",
  },
  {
    type: "이벤트",
    content: "Paid",
    button: "$450.00",
    time: "Credit Card",
  },
  {
    type: "친구 요청",
    content: "Paid",
    button: "$550.00",
    time: "PayPal",
  },
  {
    type: "초대 요청",
    content: "Pending",
    button: "$200.00",
    time: "Bank Transfer",
  },
];

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
          tableheader={["알림 유형", "알림 내용", "", "알림 시간", ""]}
          arrowupdown={[true, true, false, true, false]}
          contentData={invoices.map((invoice) => ({
            content: [
              invoice.type,
              invoice.content,
              invoice.button,
              invoice.time,
            ] as string[] | Element,
          }))}
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
