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
  SettingCard,
  SettingSwitch,
  SettingDropDown,
  SettingProfile,
  SettingArrow,
} from "@/components/setting/settingcomp";

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

  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-8 overflow-auto px-8">
      <div className="flex w-full flex-grow flex-col gap-4">
        <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
          <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
            프로필 설정
          </DialogTitle>
        </DialogHeader>
        <SettingProfile id="별명" nickname="이승철 과장" className="" />
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
        />
        <SettingButton
          title="비밀번호"
          content="계정 로그인에 사용할 비밀번호를 재설정하세요"
          buttonTitle="비밀번호 변경"
          onClick={() => console.log("비밀번호 변경")}
          className="h-full w-full"
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
        />
        <SettingArrow
          title="내 계정 삭제"
          content="tmdcjf326dtmdcjf@gmail.com"
          titleClassName="text-red-500"
        />
      </div>
    </div>
  );
}
