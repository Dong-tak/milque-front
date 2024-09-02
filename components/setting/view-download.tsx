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
import { SettingDataTable } from "@/components/setting/data-table";
import { buffer } from "stream/consumers";
import { profile } from "console";
import { channel } from "process";

const tableheader = [
  { title: "채널/계정", accessor: "socials", sort: true },
  { title: "원문", accessor: "content", sort: true },
  { title: "범위", accessor: "range", sort: true },
  { title: "다운로드 시간", accessor: "date", sort: true },
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
    range: "영상", // list
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
    range: "이미지+본문",
    date: "24.07.24 18:32",
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
    range: "이미지+본문",
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
    range: "이미지+본문",
    date: "24.07.24 18:32",
  },
  // 추가 데이터...
];

export function DownloadView() {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          다운로드 관리
        </DialogTitle>
      </DialogHeader>
      <SettingButton
        title="다운로드 폴더"
        content="MacintoshHD/Users/velroy/baepsaes/mileque/"
        buttonTitle="폴더변경"
        onClick={() => console.log("친구 요청하기")}
      />
      <SettingDropDown
        title="다운로드 범위"
        content="다운로드할 범위를 선택하세요"
        dropdownTitle="이미지/영상"
        value="image&video" // 기본 선택된 값을 설정해야 합니다.
        menulabel="다운로드 범위"
        radioItems={[
          { label: "이미지/영상", value: "image&video" },
          { label: "본문", value: "content" },
          { label: "댓글", value: "comment" },
          { label: "이미지/영상+본문", value: "image&video&content" },
          { label: "이미지/영상+댓글", value: "image&video&comment" },
          { label: "본문+댓글", value: "content&comment" },
          {
            label: "이미지/영상+본문+댓글",
            value: "image&video&content&comment",
          },
        ]}
      />
      <div>
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            내 다운로드 히스토리
          </DialogTitle>
        </DialogHeader>
        <SettingDataTable tableheader={tableheader} contentData={contentData} />
      </div>
    </div>
  );
}
