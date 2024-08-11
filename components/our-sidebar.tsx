import {
  Calculator,
  Calendar,
  ChevronRight,
  CreditCard,
  FileDown,
  History,
  Link,
  LogIn,
  LogOut,
  Plus,
  Scan,
  Settings,
  Smile,
  User,
  UserPlus,
  Users,
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
} from "@/components/ui/command";
import React from "react";
import { cn } from "@/lib/utils";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { OurAvatar } from "./our-avatar";

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
    <CommandItem disabled={disabled} className="others-medium-button px-4 py-2">
      {children}
    </CommandItem>
  );
}

function SidebarList({ children }: { children: React.ReactNode }) {
  return <CommandList className="max-h-none">{children}</CommandList>;
}

export function OurSidebar() {
  return (
    <Command className="w-[200px] border">
      <SidebarList>
        <SelectGroup className="pl-5 pt-4">
          <SelectLabel className="others-medium-button">마이</SelectLabel>
        </SelectGroup>
        <CommandGroup>
          <SidebarItem>
            <Scan className="mr-2 h-4 w-4" />
            <span>스크랩</span>
          </SidebarItem>
          <SidebarItem>
            <History className="mr-2 h-4 w-4" />
            <span>히스토리</span>
            <CommandShortcut>999+</CommandShortcut>
          </SidebarItem>
          <SidebarItem disabled>
            <Users className="mr-2 h-4 w-4" />
            <span>트렌드</span>
            <CommandShortcut>준비중</CommandShortcut>
          </SidebarItem>
        </CommandGroup>
        <CommandSeparator />
        <SelectGroup className="pl-5 pt-4">
          <SelectLabel className="others-medium-button">그룹</SelectLabel>
        </SelectGroup>
        <CommandGroup>
          <SidebarItem>
            <OurAvatar className="mr-2 size-4" />
            <span>VLAD</span>
            <CommandShortcut>6</CommandShortcut>
          </SidebarItem>
          <SidebarItem>
            <OurAvatar className="mr-2 h-4 w-4" />
            <span>한예종 광고 19학번</span>
            <CommandShortcut>21</CommandShortcut>
          </SidebarItem>
          <SidebarItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>그룹 추가하기</span>
            <CommandShortcut>
              <Plus className="h-4 w-4 text-popover-foreground" />
            </CommandShortcut>
          </SidebarItem>
        </CommandGroup>
        <CommandSeparator />
        <SelectGroup className="pl-5 pt-4">
          <SelectLabel className="others-medium-button">바로가기</SelectLabel>
        </SelectGroup>
        <CommandGroup>
          <SidebarItem>
            <Link className="mr-2 size-4" />
            <span>계정 연결하기</span>
          </SidebarItem>
          <SidebarItem>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>초대하기</span>
          </SidebarItem>
          <SidebarItem>
            <FileDown className="mr-2 h-4 w-4" />
            <span>다운로드</span>
          </SidebarItem>
          <SidebarItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>환경설정</span>
          </SidebarItem>
          <SidebarItem>
            <LogIn className="mr-2 h-4 w-4" />
            <span>로그인</span>
          </SidebarItem>
          <SidebarItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>로그아웃</span>
          </SidebarItem>
        </CommandGroup>
      </SidebarList>
    </Command>
  );
}
