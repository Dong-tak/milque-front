import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  SettingButton,
  SettingSwitch,
  SettingDropDown,
  SettingProfile,
  SettingArrow,
} from "@/components/setting/setting-comp";
import {
  SettingAlertDialog,
  SettingTwoLabel,
  SettingAlertLink,
  SettingOneLabel,
  SettingMediaSlect,
} from "@/components/setting/alert-dialog";
import { PasswordDialog } from "@/components/setting/dialog-component/password-view";
import { ChevronRight } from "lucide-react";
import { DeleteAccountDialog } from "./dialog-component/delete-account-view";

export function ProfileView() {
  const [profile, setProfile] = useState({
    name: "Pedro Duarte",
    username: "@peduarte",
    introduction: "",
    profilePicture: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const button = (
    <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
      <ChevronRight className="relative h-4 w-4 text-black" />
    </Button>
  );

  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            내 프로필
          </DialogTitle>
        </DialogHeader>
        <SettingProfile
          id="별명"
          nickname="이승철 과장"
          className=""
          src="/images/rectangle-352.png"
        />
        <SettingButton
          title="별명"
          content="이승철 과장"
          buttonTitle="별명 변경"
          onClick={() => console.log("이름 변경")}
          className="h-full w-full"
          username="이승철"
          dialogAlertTitle={"별명 변경"}
          alertdiscription="별명을 변경하시겠습니까?"
        />
        <SettingButton
          title="한줄 소개"
          content="어쩌구 저쩌구"
          buttonTitle="별명 변경"
          onClick={() => console.log("이름 변경")}
          className="h-full w-full"
          username="이승철"
          dialogAlertTitle={"이름 변경"}
          alertdiscription="이름을 변경하시겠습니까?"
        />
      </div>

      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            계정 보안
          </DialogTitle>
        </DialogHeader>
        <SettingButton
          title="인증수단"
          content="tmdcjf326dtmdcjf@gmail.com"
          buttonTitle="인증수단 변경"
          onClick={() => console.log("인증수단 변경")}
          className="h-full w-full"
          username="이승철"
          dialogAlertTitle={"인증"}
          alertdiscription="오늘은 당신을 위한 선물을 준비했어요. 좋다면 소리 벗고, 팬티 질러주세요! 당신이 참 궁금합니다."
        />
        <SettingArrow
          title="비밀번호 변경"
          content="계정 로그인에 사용할 비밀번호를 재설정하세요"
          className="h-full w-full"
          trigger={
            <PasswordDialog
              dialogTitle="비밀번호 재설정"
              dialogDescription="계정 로그인에 사용할 새 비밀번호를 입력하세요."
              button={button}
            />
          }
        />
        <SettingSwitch
          title="계정공개 여부"
          content="친구가 아닌 유저들도 내 스크랩을 볼 수 있어요"
          className="h-full w-full"
        />
        <SettingSwitch
          title="프로필 검색 가능 여부"
          content="검색으로 계정이 노출되요"
          className="h-full w-full"
        />
      </div>
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            지원
          </DialogTitle>
        </DialogHeader>
        <SettingArrow
          title="로그아웃"
          content="tmdcjf326dtmdcjf@gmail.com"
          className=""
          trigger={
            <PasswordDialog
              dialogTitle="비밀번호 재설정"
              dialogDescription="계정 로그인에 사용할 새 비밀번호를 입력하세요."
              button={button}
            />
          }
        />
        <SettingArrow
          title="내 계정 삭제"
          content="tmdcjf326dtmdcjf@gmail.com"
          titleClassName="text-red-700"
          trigger={
            <DeleteAccountDialog
              dialogTitle="전체 계정을 영구적으로 삭제하시겠습니까?"
              dialogDescription="이 작업은 실행 취소할 수 없습니다. 전체 계정이 영구적으로 삭제됩니다. 모든 개인 스크랩이 삭제되고 모든 계정에 있는 데이터와 계정이 제거됩니다"
              button={button}
            />
          }
        />
      </div>
    </div>
  );
}
