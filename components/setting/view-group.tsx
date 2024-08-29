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
  SettingProfile,
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
import { Label } from "@/components/ui/label";
import Image from "next/image";

const tableheader = [
  { title: "사용자", accessor: "user", sort: true },
  { title: "현재 기여도", accessor: "contribute", sort: true },
  { title: "누적 기여도", accessor: "contribTotal", sort: true },
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
    contribute: 5,
    contribTotal: 4329,
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
    contribute: 5,
    contribTotal: 4329,
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
    contribute: 5,
    contribTotal: 4329,
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
    contribute: 5,
    contribTotal: 4329,
  },
  {
    user: {
      profile: "/images/avatar.png",
      title: "이승철 과장",
      content: "@vel_030_roy",
    },
    dropdownarrow: { title: "Can View", ridioitem: ["Can Commit", "Can View"] },
    contribute: 5,
    contribTotal: 4329,
  },

  // 추가 데이터...
];

export function GroupView() {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            그룹 프로필
          </DialogTitle>
        </DialogHeader>
        <SettingProfile
          id="그룹 이름"
          nickname="마일퀘"
          className=""
          src="/images/rectangle-352.png"
        />
        {/* 한줄 소개 */}
        <div className="h-full w-full space-y-[6px]">
          <div>
            {/* 아이디 */}
            <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
              한줄 소개
            </Label>
          </div>
          {/* 닉네임 */}
          <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
            <div className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400">
              마케터의 일일 퀘스트, focus on creavity without repeat.
            </div>
          </div>
        </div>
      </div>
      <div>
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full py-3 text-xl font-bold leading-7 text-slate-900">
          그룹 멤버
        </DialogTitle>
        <TestDataTable
          tableheader={tableheader}
          contentData={contentData}
          header={false}
          footer={false}
        />
      </div>
      <div className="flex-col space-y-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            그룹 관리
          </DialogTitle>
        </DialogHeader>
        <SettingArrow
          title="그룹 초대하기"
          content="새로운 그룹 멤버를 초대하세요"
          className="w-full"
        />
        <SettingArrow
          title="공지하기"
          content="그룹 전체에게 알림을 보내세요"
          className="w-full"
        />
        <SettingArrow
          title="목표 설정하기"
          content="반복되는 목표를 설정하세요"
          className="w-full"
        />
        <SettingDropDown
          title="주기 설정하기"
          content="목표를 이룰 주기를 설정하세요"
          dropdownTitle="1주일"
        />
      </div>
      <div className="flex-col space-y-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            그룹 보안
          </DialogTitle>
        </DialogHeader>
        <SettingDropDown
          title="주기 설정하기"
          content="목표를 이룰 주기를 설정하세요"
          dropdownTitle="1주일"
        />
        <SettingArrow
          title="목표 설정하기"
          content="반복되는 목표를 설정하세요"
          className="w-full"
        />
        <SettingSwitch
          title="계정 공개 여부"
          content="계정을 공개하면 모든 사용자가 볼 수 있습니다."
          className="w-full"
        />
        <SettingSwitch
          title="계정 공개 여부"
          content="계정을 공개하면 모든 사용자가 볼 수 있습니다."
          className="w-full"
        />
      </div>
    </div>
  );
}
