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
import React from "react";
import { cn } from "@/lib/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";

// const SidebarItem = React.forwardRef<
//   React.ElementRef<typeof CommandPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
// >(({ className, ...props }, ref) => (
//   <CommandPrimitive.Item
//     ref={ref}
//     className={cn(
//       "body-normal-body-01 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
//       className,
//     )}
//     {...props}
//   />
// ));

interface SidebarItemProps {
  children: React.ReactNode;
  disabled?: boolean;
}

function SidebarItem({ children, disabled }: SidebarItemProps) {
  return (
    <CommandItem
      disabled={disabled}
      className="w-full px-4 py-2 others-medium-button"
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

export function OurOptionSidebar() {
  return (
    <Command className="right-0 flex h-full max-h-[743px] w-[234px] min-w-[234px] max-w-[250px] grow flex-col items-center justify-center p-0 md:left-0 md:w-[250px]">
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
        <CommandGroup className="w-full">
          <SidebarItem>
            <Ghost className="mr-2 h-4 w-4" />
            <span>프로필 설정</span>
          </SidebarItem>
          <SidebarItem>
            <Link className="mr-2 h-4 w-4" />
            <span>소셜 계정 설정</span>
          </SidebarItem>
          <SidebarItem>
            <DownloadCloud className="mr-2 h-4 w-4" />
            <span>다운로드 설정</span>
          </SidebarItem>
          <SidebarItem>
            <Bell className="mr-2 h-4 w-4" />
            <span>알림 설정</span>
          </SidebarItem>
        </CommandGroup>
        <CommandGroup>
          <SidebarItem>
            <User className="mr-2 size-4" />
            <span>친구설정</span>
          </SidebarItem>
          <SidebarItem disabled>
            <Network className="mr-2 h-4 w-4" />
            <span>그룹설정</span>
            <CommandShortcut>준비중</CommandShortcut>
          </SidebarItem>
          <SidebarItem>
            <Share2 className="mr-2 h-4 w-4" />
            <span>공유 설정</span>
          </SidebarItem>
        </CommandGroup>
        <CommandGroup>
          <SidebarItem>
            <Sidebar className="mr-2 size-4" />
            <span>화면 설정</span>
          </SidebarItem>
          <SidebarItem>
            <LayoutTemplate className="mr-2 h-4 w-4" />
            <span>템플릿 설정</span>
          </SidebarItem>
          <SidebarItem>
            <PartyPopper className="mr-2 h-4 w-4" />
            <span>이벤트</span>
            <CommandShortcut>24</CommandShortcut>
          </SidebarItem>
          <SidebarItem>
            <Bold className="mr-2 h-4 w-4" />
            <span>베타 테스트 신청</span>
            <CommandShortcut>대기중</CommandShortcut>
          </SidebarItem>
          <SidebarItem>
            <ThumbsUp className="mr-2 h-4 w-4" />
            <span>무료 팀기능 도입 문의</span>
          </SidebarItem>
          <SidebarItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>불편/건의 사항</span>
          </SidebarItem>
        </CommandGroup>
        <CommandGroup className="border-t">
          <SidebarItem>
            <Info className="mr-2 size-4" />
            <span>도움말</span>
          </SidebarItem>
          <SidebarItem>
            <FileUp className="mr-2 h-4 w-4" />
            <span>업데이트 노트</span>
            <CommandShortcut>V1.0.3</CommandShortcut>
          </SidebarItem>
          <SidebarItem>
            <LogIn className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </SidebarItem>
        </CommandGroup>
      </SidebarList>
    </Command>
  );
}
