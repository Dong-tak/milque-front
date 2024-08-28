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
import { OurPagination } from "../our-pagination";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Settings2 } from "lucide-react";
import { OurDataTable } from "../our-datatable";
import { ColumnDef } from "@tanstack/react-table";
import { TestDataTable } from "./data-table";
import { buffer } from "stream/consumers";

const tableheader = [
  { title: "알림 유형", accessor: "type", sort: true },
  { title: "알림 내용", accessor: "content", sort: true },
  { title: "알림 시간", accessor: "date", sort: true },
];

const contentData = [
  {
    type: { name: "활동 알림", tag: true },
    contents: {
      title: "어쩌구저쩌구를 외 5개의 스크랩",
      content: "스크랩이라요",
      button: true,
    },
    date: "24.07.24 18:32",
  },
  {
    type: { name: "공지사항", tag: false },
    contents: {
      title: "어쩌구저쩌구를 외 5개의 스크랩",
      content: "어asdf의 스크랩",
      button: true,
    },
    date: "24.07.24 18:23",
  },
  {
    type: { name: "공지사항", tag: false },
    contents: {
      title: "어쩌구저쩌구를 외 5개의 스크랩",
      content: "어쩌구저쩌구를 외 5개의 스크랩",
      button: true,
    },
    date: "24.07.24 18:31",
  },
  {
    type: { name: "공지사항", tag: false },
    contents: {
      title: "어쩌구저쩌구를 외 5개의 스크랩",
      content: "어쩌구저쩌구를 외 5개의 스크랩",
      button: true,
    },
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: true },
    contents: {
      title: "어쩌구저쩌구를 외 5개의 스크랩",
      content: "어쩌구저쩌구를 외 5개asdfasdf크랩",
      button: false,
    },
    date: "24.07.14 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    contents: {
      title: "어쩌구저쩌구를 외 5개의 스크랩",
      content: "어쩌구저쩌구를 외 5개의 스크랩",
      button: false,
    },
    date: "23.07.24 18:33",
  },

  // 추가 데이터...
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
        <TestDataTable tableheader={tableheader} contentData={contentData} />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            알림 범위
          </DialogTitle>
        </DialogHeader>
        <SettingSwitch
          title="내 활동 알림"
          content="내 활동과 상태를 말합니다."
        />
        <SettingSwitch
          title="계정 상태 알림"
          content="내 활동과 상태를 말합니다."
        />
        <SettingSwitch
          title="공지사항 / 업데이트"
          content="내 활동과 상태를 말합니다."
        />
        <SettingSwitch
          title="친구요청/그룹초대 요청"
          content="내 활동과 상태를 말합니다.  @radix-ui/react-icons"
        />
      </div>
    </div>
  );
}
