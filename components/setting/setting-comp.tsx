"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// 이메일 변경 버튼 컴포넌트 , 모달 기능 추가 예상
interface EmailChangeButtonProps {
  onClick: () => void;
  title: string;
  content: string;
  buttonTitle: string;
  className?: string;
}

export function SettingButton({
  onClick,
  title,
  content,
  buttonTitle,
  className,
}: EmailChangeButtonProps) {
  return (
    <div className={`inline-flex items-center justify-between ${className}`}>
      <div className="inline-flex h-10 flex-col items-start justify-start gap-1">
        <Label className="font-['SUIT Variable'] self-stretch text-sm font-normal leading-tight text-slate-900">
          {title}
        </Label>
        <Label className="font-['SUIT Variable'] flex self-stretch text-xs font-normal leading-none text-slate-500">
          {content}
        </Label>
      </div>
      <div>
        <Button
          size={"sm"}
          type="submit"
          className="font-['SUIT Variable'] leading-tigh inline-flex h-9 shrink grow basis-0 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-center text-sm font-semibold text-slate-900 hover:bg-background"
          onClick={onClick}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
}

// 카드 형태
interface SettingCardProps {
  title: string;
  content: string;
  className?: string;
}

export function SettingCard({ title, content, className }: SettingCardProps) {
  return (
    <div
      className={`inline-flex h-10 items-center justify-between ${className}`}
    >
      <div className="inline-flex h-10 flex-col items-start justify-start gap-1">
        <Label className="font-['SUIT Variable'] self-stretch text-sm font-normal leading-tight text-slate-900">
          {title}
        </Label>
        <Label className="font-['SUIT Variable'] self-stretch text-xs font-normal leading-none text-slate-500">
          {content}
        </Label>
      </div>
      <div className="inline-flex h-10 flex-col items-end justify-end gap-2.5">
        <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
          <ChevronRight className="relative h-4 w-4 text-black" />
        </Button>
      </div>
    </div>
  );
}

// 스위치 형태
interface SettingSwitchProps {
  title: string;
  content: string;
  className?: string;
}

export function SettingSwitch({
  title,
  content,
  className,
}: SettingSwitchProps) {
  return (
    <div
      className={`${className} inline-flex h-10 items-center justify-between`}
    >
      <div className="inline-flex h-10 flex-col items-start justify-start gap-1">
        <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
          {title}
        </Label>
        <Label className="font-['SUIT Variable'] self-stretch text-xs font-normal leading-none text-slate-500">
          {content}
        </Label>
      </div>
      <div className="inline-flex h-10 flex-col items-end justify-end gap-2.5">
        <Switch />
      </div>
    </div>
  );
}

// 드롭다운 형태
interface SettingDropDownProps {
  title: string;
  content: string;
  className?: string;
  //드롭다운 메뉴 타이틀 및 내용 추가 필요
  dropdownTitle: string;
}

export function SettingDropDown({
  title,
  content,
  className,
  dropdownTitle,
}: SettingDropDownProps) {
  const [position, setPosition] = React.useState("bottom");
  return (
    <div
      className={`inline-flex h-10 w-full items-center justify-between ${className}`}
    >
      <div className="inline-flex h-10 flex-col items-start justify-start gap-1">
        <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
          {title}
        </Label>
        <Label className="font-['SUIT Variable'] self-stretch text-xs font-normal leading-none text-slate-500">
          {content}
        </Label>
      </div>
      <div className="inline-flex h-10 flex-col items-end justify-end gap-2.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="justify-between gap-2 border-none"
            >
              {dropdownTitle}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

//라벨 형태

interface SettingArrowProps {
  title: string;
  content: string;
  className?: string;
  titleClassName?: string;
}

export function SettingArrow({
  title,
  content,
  className,
  titleClassName,
}: SettingArrowProps) {
  return (
    <div className={`inline-flex items-center justify-between ${className}`}>
      <div className="inline-flex h-10 flex-col items-start justify-start gap-1">
        <Label
          className={`${titleClassName}font-['SUIT Variable'] self-stretch text-sm font-normal leading-tight text-slate-900`}
        >
          {title}
        </Label>
        <Label className="font-['SUIT Variable'] self-stretch text-xs font-normal leading-none text-slate-500">
          {content}
        </Label>
      </div>
      <div className="inline-flex h-10 flex-col items-end justify-end gap-2.5">
        <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
          <ChevronRight className="relative h-4 w-4 text-black" />
        </Button>
      </div>
    </div>
  );
}

// 프로필 설정
interface SettingProfileProps {
  id: string;
  nickname: string;
  className?: string;
  src?: string;
}

export function SettingProfile({
  id,
  nickname,
  className,
  src = "",
}: SettingProfileProps) {
  return (
    <div
      className={`inline-flex h-full w-full items-center justify-start space-x-4 ${className}`}
    >
      <div className="inline-flex h-20 flex-col items-end justify-end gap-2.5">
        <Image
          className="h-20 w-20 rounded-[999px] border"
          src={src}
          alt="Profile Image"
          width={80}
          height={80}
        />
      </div>

      <div className="space-y-[6px]">
        <div>
          {/* 아이디 */}
          <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
            {id}
          </Label>
        </div>
        {/* 닉네임 */}
        <div className="inline-flex h-10 w-[258px] items-center justify-start gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
          <div className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400">
            {nickname}
          </div>
        </div>
      </div>
    </div>
  );
}
