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
import { SettingDataTable } from "@/components/setting/data-table";
import { useState } from "react";
import { Item } from "@radix-ui/react-accordion";

// 데이터 타입 정의
type ContentDataItem = {
  id: number;
  type: { name: string; tag: boolean };
  contents: {
    title: string;
    content: string;
    button: boolean;
    profile?: string;
  };
  date: string;
};

// 샘플 데이터 정의
const initialContentData: ContentDataItem[] = [
  {
    id: 1,
    type: { name: "활동 알림", tag: true },
    contents: {
      title: "어쩌구저쩌구를 외 5개의 스크랩",
      content: "을 성공적으로 완료했습니다.",
      button: true,
    },
    date: "24.07.24 18:32",
  },
  {
    id: 2,
    type: { name: "공지사항", tag: true },
    contents: {
      title: "[24.07.24] 등급제를 실시했습니다.",
      content: "자세한 내용은 공지사항을 확인해주세요",
      button: true,
    },
    date: "24.07.24 18:23",
  },
  {
    id: 3,
    type: { name: "업데이트", tag: true },
    contents: {
      title: "버전 1.0.3으로 업데이트 되었습니다.",
      content: "자세한 내용은 업데이트 노트를 확인해주세요",
      button: true,
    },
    date: "24.07.24 18:31",
  },
  {
    id: 4,
    type: { name: "이벤트", tag: false },
    contents: {
      title: "잡아라 알을 잡아라!!",
      content: "새로운 이벤트가 게시되었습니다.",
      button: true,
    },
    date: "24.07.24 18:33",
  },
  {
    id: 5,
    type: { name: "친구 요청", tag: false },
    contents: {
      profile: "/images/avatar.png",
      title: "@Dorte98 님이 친구 요청을 보냈습니다.",
      content: "수락하시겠습니까?",
      button: true,
    },
    date: "24.07.14 18:33",
  },
  {
    id: 6,
    type: { name: "초대 요청", tag: false },
    contents: {
      profile: "/images/avatar.png",
      title: "삼성전자 마케팅팀에서 초대 요청을 보냈습니다",
      content: "수락하시겠습니까?",
      button: true,
    },
    date: "23.07.24 18:33",
  },
];

const tableheader = [
  { title: "알림 유형", accessor: "type", sort: true },
  { title: "알림 내용", accessor: "contents", sort: true },
  { title: "알림 시간", accessor: "date", sort: true },
];

export const NotificationView: React.FC = () => {
  // 상태 정의
  const [contentData, setContentData] =
    useState<ContentDataItem[]>(initialContentData);

  // 데이터 삭제 함수 정의
  const handleDelete = async (id: number) => {
    // UI에서 먼저 아이템을 제거합니다.
    setContentData((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);
      console.log("Updated items:", updatedItems);
      return updatedItems;
    });

    try {
      console.log(`Deleting item with id: ${id}`);
      // API 호출을 통해 데이터를 삭제합니다.
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the item");
      }

      console.log(`Item with id: ${id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting item:", error);
      // 오류가 발생하면 UI를 원래 상태로 복구합니다.
      setContentData((prevItems) => {
        const restoredItems = [
          ...prevItems,
          initialContentData.find((item) => item.id === id)!,
        ];
        console.log("Restored items:", restoredItems);
        return restoredItems;
      });
    }
  };

  // 메뉴 아이템 생성 함수 정의
  const generateMenuItems = (id: number) => [
    {
      label: "삭제하기",
      onClick: () => handleDelete(id),
    },
  ];

  return (
    <div className="setting-frame">
      <div className="setting-block">
        <DialogHeader className="setting-header">
          <DialogTitle className="h-auto w-full text-xl font-bold leading-7 text-slate-900">
            내 알림
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <SettingDataTable
            tableheader={tableheader}
            contentData={contentData}
            menuItems={generateMenuItems(contentData[0]?.id || 0)} // 첫 번째 아이템의 ID를 사용
          />
        </div>
      </div>
      <div className="setting-block">
        <DialogHeader className="setting-header">
          <DialogTitle className="h-auto w-full text-xl font-bold leading-7 text-slate-900">
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
          title="보안 알림"
          content="계정 보안과 관련된 알림입니다."
        />
      </div>
    </div>
  );
};

export default NotificationView;
