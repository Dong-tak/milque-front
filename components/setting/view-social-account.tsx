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
} from "../shadcn/our-status-tag";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingDataTable } from "@/components/setting/data-table";
import { MediaSlect } from "./social-dialog/media-slect";
import { useState } from "react";
import { UpdateMedia } from "@/components/setting/social-dialog/media-update";
import { DeleteMedia } from "@/components/setting/social-dialog/media-delete";
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
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [initialContentData, setContentData] = useState(contentData);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateCloseDialog = () => {
    setIsUpdateDialogOpen(false);
  };
  const handleDeleteCloseDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    setContentData(
      initialContentData.filter((item) => item.account !== selectedAccount),
    );
    setIsDeleteDialogOpen(false);
  };
  const arrow = (
    <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
      <ChevronRight className="relative h-4 w-4 text-black" />
    </Button>
  );

  return (
    <div className="setting-frame">
      <div className="setting-block">
        <DialogHeader className="setting-header">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            소셜 계정 관리
          </DialogTitle>
        </DialogHeader>
        <SettingArrow
          title="새로운 소셜 계정 연결하기"
          content="내 활동과 상태를 알립니다."
          className="h-full w-full"
          trigger={
            <MediaSlect
              dialogTitle={"소셜 계정 연결"}
              dialogDescription={"연결할 소셜 미디어를 선택하세요."}
              button={arrow}
            />
          }
        />
        <SettingButton
          title="소셜 계정 진단하기"
          content="연결된 소셜 계정들의 연결 상태를 진단합니다."
          className="h-full w-full"
          trigger={undefined}
        />
      </div>
      <div className="setting-block">
        <DialogTitle className="h-auto w-full text-xl font-bold leading-7 text-slate-900">
          내 소셜 계정
        </DialogTitle>
        <div className="overflow-x-auto">
          <SettingDataTable
            tableheader={tableheader}
            contentData={contentData}
            header={false}
            footer={false}
            menuItems={[
              { label: "삭제하기", onClick: handleDeleteClick },
              { label: "수정하기", onClick: handleUpdateClick },
            ]}
          />
        </div>
      </div>
      <div>
        <UpdateMedia
          isOpen={isUpdateDialogOpen}
          onClose={handleUpdateCloseDialog}
        />

        <DeleteMedia
          isOpen={isDeleteDialogOpen}
          onClose={handleDeleteCloseDialog}
          onDelete={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
