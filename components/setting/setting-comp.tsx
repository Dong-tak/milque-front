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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import {
  SettingAlertDialog,
  SettingTwoLabel,
} from "@/components/setting/alert-dialog";
import { DropdownMenuRadioItemProps } from "@radix-ui/react-dropdown-menu";

// 이메일 변경 버튼 컴포넌트 , 모달 기능 추가 예상
interface EmailChangeButtonProps {
  title: string;
  content: string;
  className?: string;
  trigger: React.ReactNode;
}

export function SettingButton({
  title,
  content,
  className,
  trigger,
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
        {/* <Button variant="outline" className={className}> */}
        {trigger}
        {/* </Button> */}
      </div>
    </div>
  );
}

// 스위치 형태
interface SettingSwitchProps {
  title: string;
  content: string;
  className?: string;
  onCheckedChange?: (checked: boolean) => void; // 상태 변경 콜백 추가
}

export function SettingSwitch({
  title,
  content,
  className,
  onCheckedChange,
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
        <Switch onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
}

// 드롭다운 형태
interface SettingDropDownProps {
  title: string;
  content: string;
  className?: string;
  dropdownTitle: string;
  value: string;
  menulabel: string; // 추가된 부분
  radioItems: { label: string; value: string }[]; // 추가된 부분
  disabled?: boolean; // 추가된 부분
}

export function SettingDropDown({
  title,
  content,
  className,
  dropdownTitle,
  value,
  menulabel, // 추가된 부분
  radioItems = [], // 추가된 부분
  disabled = false,
}: SettingDropDownProps) {
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [currentTitle, setCurrentTitle] = React.useState(dropdownTitle);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    const selectedItem = radioItems.find((item) => item.value === newValue);
    if (selectedItem) {
      setCurrentTitle(selectedItem.label);
    }
  };

  return (
    <div
      className={`inline-flex h-10 w-full items-center justify-between ${className} ${
        disabled ? "pointer-events-none opacity-50" : ""
      }`}
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
              {currentTitle}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{menulabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedValue}
              onValueChange={handleValueChange}
            >
              {radioItems.map((item, index) => (
                <DropdownMenuRadioItem key={index} value={item.value}>
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
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
  trigger: React.ReactNode;
}

export function SettingArrow({
  title,
  content,
  className,
  titleClassName,
  trigger,
}: SettingArrowProps) {
  return (
    <div className={`inline-flex items-center justify-between ${className}`}>
      <div className="inline-flex h-10 flex-col items-start justify-start gap-1">
        <Label
          className={`${titleClassName} font-['SUIT Variable'] self-stretch text-sm font-normal leading-tight`}
        >
          {title}
        </Label>
        <Label className="font-['SUIT Variable'] self-stretch text-xs font-normal leading-none text-slate-500">
          {content}
        </Label>
      </div>
      <div className="inline-flex h-10 flex-col items-end justify-end gap-2.5">
        {trigger}
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

      {/* <div className="space-y-[6px]">
        <div>
          아이디 
          <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
            {id}
          </Label>
        </div>
         닉네임
        <div className="inline-flex h-10 w-[258px] items-center justify-start gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
          <div className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400">
            {nickname}
          </div>
        </div>
      </div> */}
    </div>
  );
}

interface ViewProfileProps {
  buttonTitle?: string;
  className?: string;
  onClick?: () => void;
}

const ViewProfile: React.FC<ViewProfileProps> = ({
  buttonTitle = "인증수단 변경",
  className,
  onClick,
}) => {
  return (
    <Button variant="outline" className={className} onClick={onClick}>
      {buttonTitle}
    </Button>
  );
};

export { ViewProfile };
