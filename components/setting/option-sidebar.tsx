import {
  Link,
  LogIn,
  PanelLeftClose,
  FileUp,
  Info,
  MessageSquare,
  ThumbsUp,
  Bold,
  PartyPopper,
  LayoutTemplate,
  Sidebar,
  Share2,
  Network,
  User,
  Bell,
  DownloadCloud,
  Ghost,
  Settings2,
  ScreenShareIcon,
  Cast,
} from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/optioncommand";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { SqBadge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setView } from "@/redux/features/viewSlice";

interface SidebarItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isActive?: boolean;
}

function SidebarItem({
  children,
  onClick,
  disabled,
  className,
  isActive,
}: SidebarItemProps) {
  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <CommandItem
      onClick={handleClick}
      className={cn(
        "w-full px-4 py-2 others-medium-button", // 기본 클래스
        disabled
          ? "pointer-events-none cursor-not-allowed opacity-50" // disabled인 경우
          : "active:scale-105 active:bg-accent active:text-accent-foreground",
        isActive ? "text-primary" : "", // isActive일 경우 text-primary 클래스 적용
        className, // 활성화된 경우
      )}
    >
      {children}
    </CommandItem>
  );
}

function SidebarList({ children }: { children: React.ReactNode }) {
  return (
    <CommandList className="max-h-none items-start justify-center">
      {children}
    </CommandList>
  );
}

export function OptionSidebar() {
  const dispatch = useDispatch();
  const currentView = useSelector((state: RootState) => state.view.currentView);
  return (
    <Command className="w-max-[1136px] right-0 flex h-full min-w-[234px] max-w-[250px] grow flex-col justify-between p-0 md:left-0 md:w-[250px] md:border-r">
      <div className="flex-grow">
        <SidebarList>
          <SelectGroup className="hidden h-full w-full items-start justify-center p-2 md:block">
            <div className="flex h-auto w-full min-w-[234px] items-center justify-between px-4 py-2">
              <SelectLabel className="font-['SUIT Variable'] items-start text-left text-xl font-bold leading-7 text-black">
                마일퀘 설정하기
              </SelectLabel>
            </div>
          </SelectGroup>
          <CommandGroup className="z-50 w-full">
            <SidebarItem
              onClick={() => dispatch(setView("profile"))}
              isActive={currentView === "profile"}
            >
              <Ghost className="mr-2 h-4 w-4" />
              <span>계정 설정</span>
            </SidebarItem>
            <SidebarItem
              onClick={() => dispatch(setView("detailedsettings"))}
              isActive={currentView === "detailedsettings"}
            >
              <Settings2 className="mr-2 h-4 w-4" />
              <span>상세 설정</span>
            </SidebarItem>
            <SidebarItem
              onClick={() => dispatch(setView("socialaccount"))}
              isActive={currentView === "socialaccount"}
            >
              <Link className="mr-2 h-4 w-4" />
              <span>소셜 계정 설정</span>
            </SidebarItem>
            <SidebarItem
              onClick={() => dispatch(setView("notification"))}
              isActive={currentView === "notification"}
            >
              <Bell className="mr-2 h-4 w-4" />
              <span>알림 설정</span>
            </SidebarItem>
          </CommandGroup>
          <CommandGroup>
            <SidebarItem
              onClick={() => setView("friend")}
              disabled
              className="flex justify-between"
            >
              <div className="flex">
                <User className="mr-2 size-4" />
                <span>친구설정</span>
              </div>
              <SqBadge variant={"gray"}>준비중</SqBadge>
            </SidebarItem>
            {/*  disabled 변경해야함 */}
            <SidebarItem
              onClick={() => setView("group")}
              disabled
              className="flex justify-between"
            >
              <div className="flex">
                <Network className="mr-2 h-4 w-4" />
                <span>그룹설정</span>
              </div>
              <SqBadge variant={"gray"}>준비중</SqBadge>
            </SidebarItem>
            <SidebarItem
              // onClick={() => setView("share")}
              disabled
              className="flex justify-between"
            >
              <div className="flex">
                <Share2 className="mr-2 h-4 w-4" />
                <span>공유 설정</span>
              </div>
              <SqBadge variant={"gray"}>준비중</SqBadge>
            </SidebarItem>
          </CommandGroup>
          <CommandGroup>
            <SidebarItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>불편/건의 사항</span>
            </SidebarItem>
          </CommandGroup>
        </SidebarList>
      </div>
      <div>
        <CommandGroup className="border-t">
          <SidebarItem>
            <LogIn className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </SidebarItem>
        </CommandGroup>
      </div>
    </Command>
  );
}
