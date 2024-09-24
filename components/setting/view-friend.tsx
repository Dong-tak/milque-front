import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SettingArrow } from "@/components/setting/setting-comp";
import { Button } from "@/components/ui/button";
import { SettingDataTable } from "@/components/setting/data-table";
import { ChevronRight } from "lucide-react";
import { BasicAlert } from "../alert/basic-alert";

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
  const arrow = (
    <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
      <ChevronRight className="relative h-4 w-4 text-black" />
    </Button>
  );

  return (
    <div className="setting-frame">
      <DialogHeader className="setting-header">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          친구 관리
        </DialogTitle>
      </DialogHeader>
      <SettingArrow
        title="친구 요청하기"
        content="내 활동과 상태를 말합니다."
        trigger={
          <BasicAlert
            button={arrow}
            dialogDescription="친구의 아이디를 입력해주세요."
            dialogTitle="친구요청"
            placeholder="친구 아이디 입력"
          />
        }
      />
      <div className="overflow-y-visible">
        <div className="overflow-x-auto">
          <SettingDataTable
            tableheader={tableheader}
            contentData={contentData}
            menuItems={[
              { label: "삭제하기", onClick: () => {} }, //수정 필요
              { label: "수정하기", onClick: () => {} }, //수정 필요
            ]}
          />
        </div>
      </div>
    </div>
  );
}
