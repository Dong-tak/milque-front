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
import { TestDataTable } from "./test";
// const invoices = [
//   {
//     type: (
//       <div className="flex justify-start gap-[10px]">
//         활동 알림 <NewTag />
//       </div>
//     ),
//     content: (
//       <div>
//         <p className="m-0 font-semibold">어쩌구저쩌구를 외 5개의 스크랩</p>
//         <p>을 성공적으로 완료했습니다.</p>
//       </div>
//     ),
//     button: <Button>확인하기</Button>,
//     time: "24.07.24 18:33",
//   },
//   {
//     type: (
//       <div className="flex justify-start gap-[10px]">
//         공지 사항 <NewTag />
//       </div>
//     ),
//     content: (
//       <div>
//         <p className="m-0 font-semibold">
//           [24.07.24] 능지등급제를 실시했습니다.
//         </p>
//         <p>자세한 내용은 공지사항을 확인해주세요</p>
//       </div>
//     ),
//     button: <Button>확인하기</Button>,
//     time: "24.07.24 18:33",
//   },
//   {
//     type: (
//       <div className="flex justify-start gap-[10px]">
//         업데이트 <NewTag />
//       </div>
//     ),
//     content: (
//       <div>
//         <p className="m-0 font-semibold">버전 1.0.3으로 업데이트 되었습니다.</p>
//         <p>자세한 내용은 공지사항을 확인해주세요</p>
//       </div>
//     ),
//     button: <Button>확인하기</Button>,
//     time: "24.07.24 18:33",
//   },
//   {
//     type: "이벤트",
//     content: (
//       <div>
//         <p className="m-0 font-semibold">잡아라 마형우측알을 잡아라!!</p>
//         <p>새로운 이벤트가 게시되었습니다.</p>
//       </div>
//     ),
//     button: <Button>확인하기</Button>,
//     time: "24.07.24 18:33",
//   },
//   {
//     type: "친구 요청",
//     content: (
//       <div>
//         <p className="m-0 font-semibold">
//           @Dorte98 님이 친구 요청을 보냈습니다.
//         </p>
//         <p>수락하시겠습니까?</p>
//       </div>
//     ),
//     button: <Button>수락하기</Button>,
//     time: "24.07.24 18:33",
//   },
//   {
//     type: "초대 요청",
//     content: (
//       <div>
//         <p className="m-0 font-semibold">
//           삼성전자 마케팅팀에서 초대 요청을 보냈습니다.
//         </p>
//         <p>수락하시겠습니까?</p>
//       </div>
//     ),
//     button: <Button>수락하기</Button>,
//     time: "24.07.24 18:33",
//   },
// ];
const tableheader = [
  { title: "알림 유형", accessor: "type", sort: true },
  { title: "알림 내용", accessor: "content", sort: false },
  { title: "", accessor: "action", sort: true },
  { title: "알림 시간", accessor: "date", sort: true },
];

const contentData = [
  {
    type: { name: "활동 알림", tag: true },
    content: "어쩌구저쩌구...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: true },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
  },
  {
    type: { name: "공지사항", tag: false },
    content: "[24.07.24] 능지등급제...",
    action: "확인하기",
    date: "24.07.24 18:33",
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
        {/* 필터 헤더 */}
        {/* <div className="flex justify-between">
          <div className="flex w-[602px] justify-start gap-[6px]">
            <div className="inline-flex h-10 w-full max-w-[277px] items-center justify-start gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
              <div className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400">
                Filter tasks...
              </div>
            </div>
            <Button className="gap-2 rounded-md border border-slate-200 bg-white text-[#0f172a] hover:bg-slate-200">
              <PlusCircleIcon className="relative h-4 w-4" />
              안읽은 알림
            </Button>
            <Button className="gap-2 rounded-md border border-slate-200 bg-white text-[#0f172a] hover:bg-slate-200">
              <PlusCircleIcon className="relative h-4 w-4" />
              Priority
            </Button>
          </div>
          <Button className="gap-2 rounded-md border border-slate-200 bg-white text-[#0f172a] hover:bg-slate-200">
            {" "}
            <Settings2 className="relative h-4 w-4" /> View
          </Button>
        </div> */}
        <TestDataTable tableheader={tableheader} contentData={contentData} />;
        {/* <AccountTable
          tableheader={["알림 유형", "알림 내용", "", "알림 시간", ""]}
          arrowupdown={[true, true, false, true, false]}
          contentData={invoices.map((invoice) => ({
            content: [
              invoice.type,
              invoice.content,
              invoice.button,
              invoice.time,
            ] as string[] | Element,
          }))}
        /> */}
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
          content="내 활동과 상태를 말합니다."
        />
      </div>
    </div>
  );
}
