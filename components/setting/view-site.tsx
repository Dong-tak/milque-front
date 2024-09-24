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
import { NewTag } from "../shadcn/our-status-tag";
import { OurPagination } from "../shadcn/our-pagination";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Settings2 } from "lucide-react";
import { OurDataTable } from "../shadcn/our-datatable";
import { ColumnDef } from "@tanstack/react-table";
import { SettingDataTable } from "./data-table";
import { buffer } from "stream/consumers";
import { profile } from "console";
import { channel } from "process";

const tableheader = [
  { title: "상태", accessor: "status", sort: true },
  { title: "원문", accessor: "content", sort: true },
  { title: "도메인", accessor: "domain", sort: true },
  { title: "게시 시간", accessor: "date", sort: true },
];

const contentData = [
  {
    status: "Private",
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png", //thumbnail
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용", //discription
      // range: "영상", // list
    },
    day: "24.07.24", // list
    channel: "/odnf942", // list
    date: "24.07.24 18:32",
    domain: "mileque.com",
  },
  {
    status: "Public",
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png", //thumbnail
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용", //discription
      // range: "영상", // list
    },
    day: "24.07.24", // list
    channel: "/group/3982idsf", // list
    date: "24.07.24 18:32",
    domain: "mileque.com",
  },
  {
    status: "Public",
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png", //thumbnail
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용", //discription
      // range: "영상", // list
    },
    day: "24.07.24", // list
    channel: "/39hsdjfn3", // list
    date: "24.07.24 18:32",
    domain: "mileque.com",
  },
  {
    status: "Public",
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png", //thumbnail
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용", //discription
      // range: "영상", // list
    },
    day: "24.07.24", // list
    channel: "/oiudbuf3", // list
    date: "24.07.24 18:32",
    domain: "mileque.com",
  },
  {
    status: "Private",
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png", //thumbnail
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용", //discription
      // range: "영상", // list
    },
    day: "24.07.24", // list
    channel: "/osdjb234", // list
    date: "24.07.24 18:32",
    domain: "mileque.com",
  },
  // 추가 데이터...
];

export function SiteView() {
  return (
    <div className="setting-frame">
      <DialogHeader className="setting-header">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          사이트 관리
        </DialogTitle>
      </DialogHeader>
      <SettingButton
        title="기본 도메인 변경"
        content="www.mileque.com/velroy"
        trigger={undefined} //수정필요
      />
      <div>
        <DialogHeader className="setting-header">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            내 사이트
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <SettingDataTable
            tableheader={tableheader}
            contentData={contentData}
            menuItems={[
              { label: "삭제하기", onClick: () => {} }, //수정필요
              { label: "수정하기", onClick: () => {} }, //수정필요
            ]}
          />
        </div>
      </div>
    </div>
  );
}
