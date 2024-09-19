"use client";

import {
  ArrowLeft,
  Bell,
  Bookmark,
  Calculator,
  Calendar,
  ChevronRight,
  Compass,
  CreditCard,
  FileDown,
  Ghost,
  HeartHandshake,
  History,
  Instagram,
  Link,
  LogIn,
  LogOut,
  Pin,
  Plus,
  Scan,
  Settings,
  Smile,
  SquarePlus,
  Star,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import React, { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import cookie from "cookie";

import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { SqBadge, Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Slot } from "@radix-ui/react-slot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { MilequeFullLogo, MilequeSmallLogo } from "@/public/svgBag";
import { sendGTMEvent } from "@next/third-parties/google";
import { DataFetchInClient } from "../app/api/postdata-client";

interface SidebarBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  asChild?: boolean;
  id?: string;
}

export const SidebarBtn = forwardRef<HTMLButtonElement, SidebarBtnProps>(
  (
    {
      children,
      onClick,
      className,
      disabled,
      asChild = false,
      isActive = false,
      id,
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Button;
    return (
      <Comp
        id={id}
        variant="sidebar"
        size="sidebar"
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        className={cn(
          "sidebar-item flex items-center justify-start",
          isActive && "text-accent-foreground",
          className,
        )}
      >
        {children}
      </Comp>
    );
  },
);

SidebarBtn.displayName = "SidebarBtn"; // for better debugging experience

function SidebarDropdownBtn() {
  const router = useRouter();
  const navToLink = () => {
    router.push("/link");
  };
  const navToInvite = () => {
    router.push("/invite");
  };
  const navToDownload = () => {
    router.push("/download");
  };
  const navToMark = () => {
    router.push("/bookmark");
  };
  return (
    <div className="dropdown relative flex">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md hover:bg-accent hover:text-accent-foreground">
          <SidebarBtn asChild>
            <div className="flex items-center">
              <Star className="icon mr-2 size-4" />
              <span>모음집</span>
            </div>
          </SidebarBtn>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute bottom-1 left-7 mt-1 flex flex-col">
          <DropdownMenuItem onSelect={navToLink}>
            <Link className="icon mr-2 h-4 w-4" />
            <span>계정연동</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={navToInvite}>
            <UserPlus className="icon mr-2 h-4 w-4" />
            <span>초대하기</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={navToDownload}>
            <FileDown className="icon mr-2 h-4 w-4" />
            <span>다운로드</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={navToMark}>
            <Bookmark className="icon mr-2 h-4 w-4" />
            <span>북마크</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function OurSidebar({
  noti,
  user_id,
}: {
  noti?: number;
  user_id?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [contentUrl, setContentUrl] = useState("");
  const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/${user_id}/create/`;
  const bodyData = [
    {
      content_url: contentUrl,
      comment: "Comment를 입력하세요.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentUrl(e.target.value);
  };

  const handleSaveClick = async () => {
    await DataFetchInClient({ apiUrl, bodyData, isReload: true });
  };

  const navToHome = () => {
    router.push(`/home/${user_id}`);
  };

  return (
    <div className="sidebar fixed left-0 top-0 z-50 flex h-full w-[250px] flex-col justify-between border-r">
      <div>
        <div className="p-2">
          <SidebarBtn
            onClick={navToHome}
            className="hover:bg-background hover:text-popover-foreground"
          >
            <div className="xl:hidden">
              <MilequeSmallLogo />
            </div>
            <div className="hidden xl:block">
              <MilequeFullLogo />
            </div>
          </SidebarBtn>
        </div>
        <div className="flex flex-col p-2">
          <SidebarBtn onClick={navToHome} isActive={pathname === "/"}>
            <Calendar className="icon mr-2 size-4" />
            <span>홈</span>
          </SidebarBtn>
          <SidebarBtn disabled className="flex justify-between">
            <div className="flex items-center">
              <Compass className="icon mr-2 size-4" />
              <span>탐색</span>
            </div>
            <SqBadge variant={"gray"}>준비중</SqBadge>
          </SidebarBtn>
          <Dialog>
            <DialogTrigger asChild>
              {user_id ? (
                <SidebarBtn id="scrap-sidebar">
                  <SquarePlus className="icon mr-2 size-4" />
                  <span>스크랩</span>
                </SidebarBtn>
              ) : (
                <SidebarBtn id="scrap-sidebar-disabled" disabled>
                  <SquarePlus className="icon mr-2 size-4" />
                  <span>스크랩</span>
                </SidebarBtn>
              )}
            </DialogTrigger>
            <DialogContent className="max-h-[200px] w-full max-w-[512px] gap-5 rounded-md bg-popover p-6">
              <DialogHeader>
                <DialogTitle className="w-full pb-2 display-undefine-display-01">
                  스크랩할 페이지를 입력하세요
                </DialogTitle>
                <DialogDescription className="w-full body-normal-body-02">
                  링크를 입력하고 바로 저장하세요!
                </DialogDescription>
              </DialogHeader>
              <div className="items-center gap-4">
                <Input
                  id="url"
                  value={contentUrl}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="링크를 입력하세요"
                />
              </div>
              <DialogFooter className="flex items-end justify-end gap-2">
                <Button variant={"outline"}>
                  <ArrowLeft className="icon mr-2 size-4" />
                  뒤로가기
                </Button>
                <Button
                  id="scrap-save-btn"
                  type="submit"
                  onClick={handleSaveClick}
                >
                  저장하기
                  <Pin className="icon ml-2 size-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SidebarBtn
            className="flex justify-between"
            isActive={pathname === "/group"}
          >
            <div className="flex items-center">
              <HeartHandshake className="icon mr-2 size-4" />
              <span>그룹</span>
            </div>
            <SqBadge variant={"outlineDefault"}>NEW</SqBadge>
          </SidebarBtn>
          <SidebarDropdownBtn />
        </div>
        <div className="direct flex flex-col p-2">
          <Label className="sidebar-label px-4 py-2 others-medium-button">
            바로가기
          </Label>
          <SidebarBtn>
            <Link className="mr-2 size-4" />
            <span>계정 연동</span>
          </SidebarBtn>
          <SidebarBtn>
            <UserPlus className="mr-2 size-4" />
            <span>초대하기</span>
          </SidebarBtn>
          <SidebarBtn>
            <FileDown className="mr-2 size-4" />
            <span>다운로드</span>
          </SidebarBtn>
          <SidebarBtn>
            <Bookmark className="mr-2 size-4" />
            <span>북마크</span>
          </SidebarBtn>
        </div>
      </div>
      <div>
        <Separator />
        <div className="flex flex-col p-2">
          <SidebarBtn>
            <Ghost className="icon mr-2 size-4" />
            <span>프로필</span>
          </SidebarBtn>
          <SidebarBtn className="flex justify-between">
            <div className="flex items-center">
              <Bell className="icon mr-2 size-4" />
              <span>알림</span>
            </div>
            {noti ? <Badge variant={"default"}>{noti}</Badge> : null}
          </SidebarBtn>
          <SidebarBtn>
            <Settings className="icon mr-2 size-4" />
            <span>설정</span>
          </SidebarBtn>
        </div>
      </div>
    </div>
  );
}
