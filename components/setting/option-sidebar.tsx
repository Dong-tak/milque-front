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

interface SidebarItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function SidebarItem({ children, onClick, disabled }: SidebarItemProps) {
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
      className={`w-full px-4 py-2 others-medium-button ${disabled ? "opacity-50" : "active:scale-105 active:bg-accent active:text-accent-foreground"}`} // active가 아닌경우  클릭 시 배경과 텍스트 색상 변경
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

export interface OurOptionSidebarProps {
  setView: (
    view:
      | "profile"
      | "detailedsettings"
      | "socialaccount"
      | "download"
      | "notification"
      | "scrap"
      | "friend"
      | "group"
      | "share"
      | "display"
      | "template"
      | "event"
      | "beta"
      | "team"
      | "feedback"
      | "help"
      | "update"
      | "logout",
  ) => void;
}
export function OptionSidebar({ setView }: OurOptionSidebarProps) {
  return (
    <Command className="w-max-[1136px] right-0 flex h-full max-h-[743px] min-w-[234px] max-w-[250px] grow flex-col items-center justify-center p-0 md:left-0 md:w-[250px] md:border-r">
      <SidebarList>
        <SelectGroup className="hidden h-full w-full items-start justify-center p-2 md:block">
          <div className="flex h-auto w-full min-w-[234px] items-center justify-between px-4 py-2">
            <SelectLabel className="font-['SUIT Variable'] items-start text-left text-xl font-bold leading-7 text-black">
              마일퀘 설정하기
            </SelectLabel>
            <div className="p-3">
              <PanelLeftClose className="relative ml-auto h-5 w-5 items-end" />
            </div>
          </div>
        </SelectGroup>
        <CommandGroup className="z-50 w-full">
          <SidebarItem onClick={() => setView("profile")}>
            <Ghost className="mr-2 h-4 w-4" />
            <span>계정 설정</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("detailedsettings")}>
            <Settings2 className="mr-2 h-4 w-4" />
            <span>상세 설정</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("socialaccount")}>
            <Link className="mr-2 h-4 w-4" />
            <span>소셜 계정 설정</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("download")}>
            <DownloadCloud className="mr-2 h-4 w-4" />
            <span>다운로드 설정</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("notification")}>
            <Bell className="mr-2 h-4 w-4" />
            <span>알림 설정</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("scrap")}>
            <ScreenShareIcon className="mr-2 h-4 w-4" />
            <span>스크랩 설정</span>
          </SidebarItem>
        </CommandGroup>
        <CommandGroup>
          <SidebarItem onClick={() => setView("friend")}>
            <User className="mr-2 size-4" />
            <span>친구설정</span>
          </SidebarItem>
          {/*  disabled 변경해야함 */}
          <SidebarItem onClick={() => setView("group")}>
            <Network className="mr-2 h-4 w-4" />
            <span>그룹설정</span>
            <CommandShortcut>준비중</CommandShortcut>
          </SidebarItem>
          <SidebarItem onClick={() => setView("share")}>
            <Share2 className="mr-2 h-4 w-4" />
            <span>공유 설정</span>
          </SidebarItem>
        </CommandGroup>
        <CommandGroup>
          <SidebarItem onClick={() => setView("display")}>
            <Sidebar className="mr-2 size-4" />
            <span>화면 설정</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("template")}>
            <LayoutTemplate className="mr-2 h-4 w-4" />
            <span>템플릿 설정</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("event")}>
            <PartyPopper className="mr-2 h-4 w-4" />
            <span>이벤트</span>
            <CommandShortcut>24</CommandShortcut>
          </SidebarItem>
          <SidebarItem onClick={() => setView("beta")}>
            <Bold className="mr-2 h-4 w-4" />
            <span>베타 테스트 신청</span>
            <CommandShortcut>대기중</CommandShortcut>
          </SidebarItem>
          <SidebarItem onClick={() => setView("team")}>
            <ThumbsUp className="mr-2 h-4 w-4" />
            <span>무료 팀기능 도입 문의</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("feedback")}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>불편/건의 사항</span>
          </SidebarItem>
          <SidebarItem>
            <div className="block h-full md:hidden">왜 안돼</div>
          </SidebarItem>
        </CommandGroup>
        <CommandGroup className="border-t">
          <SidebarItem onClick={() => setView("help")}>
            <Info className="mr-2 size-4" />
            <span>도움말</span>
          </SidebarItem>
          <SidebarItem onClick={() => setView("update")}>
            <FileUp className="mr-2 h-4 w-4" />
            <span>업데이트 노트</span>
            <CommandShortcut>V1.0.3</CommandShortcut>
          </SidebarItem>
          <SidebarItem onClick={() => setView("logout")}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </SidebarItem>
        </CommandGroup>
      </SidebarList>
    </Command>
  );
}
