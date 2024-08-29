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
import { profile } from "console";
import { root } from "postcss";

const tableheader = [
  { title: "사용자", accessor: "user", sort: true },
  { title: "권한", accessor: "dropdownarrow", sort: true },
];

const contentData = [
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
  },

  // 추가 데이터...
];

export function FriendView() {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          친구 관리
        </DialogTitle>
      </DialogHeader>
      <SettingArrow
        title="친구 요청하기"
        content="내 활동과 상태를 말합니다."
      />
      <TestDataTable tableheader={tableheader} contentData={contentData} />
    </div>
  );
}
