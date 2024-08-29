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
import {
  GoodTag,
  WarningTag,
  StopTag,
  NewTag,
  RecommendTag,
  HotTag,
  PrivateTag,
  PublicTag,
} from "../our-status-tag";
import { SocialTag } from "../our-social-tag";
import { TestDataTable } from "./data-table";

const tableheader = [
  { title: "미디어", accessor: "socials", sort: true },
  { title: "계정", accessor: "account", sort: true },
  { title: "스크랩 수", accessor: "scrap_count", sort: true },
  { title: "연결 상태", accessor: "status", sort: true },
];

const contentData = [
  {
    socials: {
      size: "default",
      social: "youtube",
      logo: "/social-media/icon-youtube.png",
    },
    account: "velroylee669",
    scrap_count: 2182,
    status: "Good",
  },
  {
    socials: {
      size: "default",
      social: "linkedin",
      logo: "/social-media/icon-linkedin.png",
    },
    account: "539639259",
    scrap_count: 321,
    status: "Good",
  },
  {
    socials: {
      size: "default",
      social: "instagram",
      logo: "/social-media/icon-instagram.png",
    },
    account: "vel_030_roy",
    scrap_count: 1282,
    status: "Stop",
  },
  {
    socials: {
      size: "default",
      social: "instagram",
      logo: "/social-media/icon-instagram.png",
    },
    account: "mileque_contact",
    scrap_count: 128,
    status: "Good",
  },
  {
    socials: {
      size: "default",
      social: "Messnger",
      logo: "/social-media/icon-messenger.png",
    },
    account: "100004859553991",
    scrap_count: 31,
    status: "Warning",
  },
  // 추가 데이터...
];

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
        <TestDataTable
          tableheader={tableheader}
          contentData={contentData}
          header={false}
          footer={false}
        />
      </div>
    </div>
  );
}
