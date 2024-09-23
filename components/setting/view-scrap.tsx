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
  { title: "채널/계정", accessor: "socials", sort: true },
  { title: "원문", accessor: "content", sort: true },
  { title: "통로", accessor: "channel", sort: true },
  { title: "소속", accessor: "day", sort: true },
  { title: "스크랩 시간", accessor: "date", sort: true },
];

const contentData = [
  {
    socials: {
      size: "default", // "sm" 또는 "default"로 변경 불필요 할듯
      social: "youtube", //media
      logo: "/social-media/icon-youtube.png", //mediaLogo
    },
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png", //thumbnail
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용", //discription
      // range: "영상", // list
    },
    day: "24.07.24", // list
    channel: "mileque", // list
    date: "24.07.24 18:32",
  },
  {
    socials: {
      size: "default", // "sm" 또는 "default"로 변경
      social: "instagram",
      logo: "/social-media/icon-instagram.png",
    },
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png",
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용",
    },
    day: "24.07.24",
    channel: "mileque", // list
    date: "24.07.24 18:31",
  },
  {
    socials: {
      size: "default", // "sm" 또는 "default"로 변경
      social: "X (twitter)",
      logo: "/social-media/icon-x-twitter.png",
    },
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png",
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용",
    },
    day: "24.07.24",
    channel: "mileque", // list
    date: "24.07.24 18:32",
  },
  {
    socials: {
      size: "default", // "sm" 또는 "default"로 변경
      social: "tiktok",
      logo: "/social-media/icon-tiktok.png",
    },
    content: {
      profile: "/images/unsplash-qwo-n-ahbm-l-lo.png",
      title: "원문 제목 원문 제목 원문 제목 원문 제목",
      content: "원문 내용",
    },
    day: "24.07.24",
    channel: "mileque", // list
    date: "24.07.24 18:32",
  },
  // 추가 데이터...
];

export function ScrapView() {
  return (
    <div className="setting-frame">
      <DialogHeader className="setting-header">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          스크랩 관리
        </DialogTitle>
      </DialogHeader>
      <SettingArrow
        title="직접 스크랩"
        content="링크를 입력하여 직접 스크랩을 할 수 있습니다."
        trigger={undefined} //수정필요
      />
      <SettingArrow
        title="새로운 소셜 계정 연결하기"
        content="내 활동과 상태를 알립니다."
        trigger={undefined} //수정필요
      />
      <div>
        <DialogHeader className="setting-header">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            내 스크랩 히스토리
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
