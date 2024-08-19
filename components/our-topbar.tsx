"use client";

import {
  Bell,
  Bookmark,
  Calculator,
  Calendar,
  ChevronDown,
  ChevronRight,
  Compass,
  CreditCard,
  DraftingCompass,
  FileDown,
  Ghost,
  HeartHandshake,
  History,
  Link,
  LogIn,
  LogOut,
  Plus,
  Scan,
  Settings,
  Smile,
  SquarePlus,
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
import { useRouter } from "next/navigation";
import { Badge, SqBadge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarBtn } from "./our-sidebar";

interface SidebarItemProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

function SidebarItem({
  className,
  children,
  disabled,
  onSelect,
}: SidebarItemProps) {
  return (
    <CommandItem
      onSelect={onSelect}
      disabled={disabled}
      className={cn("p-[15px] others-medium-button", className)}
    >
      {children}
    </CommandItem>
  );
}

function SidebarList({ children }: { children: React.ReactNode }) {
  return (
    <CommandList className="flex max-h-none flex-row">{children}</CommandList>
  );
}

function NavButton({
  children,
  onClick,
  disabled,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Button
      variant="background"
      size={"nav"}
      disabled={disabled}
      className={cn(
        "rounded-none border-none hover:text-accent-foreground",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

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
    <div className="dropdown flex">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md">
          <ChevronDown className="icon size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mt-1 flex flex-col">
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

export function OurTopBar() {
  const router = useRouter();
  const navToHome = () => {
    router.push("/");
    console.log("click!!!");
  };
  const navToSetting = () => {
    router.push("/setting");
  };

  return (
    <div className="top-bar fixed top-0 z-50 flex w-full justify-between border-b bg-background">
      <div className="flex">
        <NavButton
          onClick={navToHome}
          className="p-3 hover:bg-background hover:text-current hover:opacity-100 focus:outline-none"
        >
          <DraftingCompass className="size-6" />
        </NavButton>
        <SidebarDropdownBtn />
      </div>
      <div className="flex">
        <NavButton className="relative">
          <Bell className="size-6" />
          <div className="absolute right-[14px] top-[10px] flex h-2 w-2 items-center justify-center rounded-full bg-destructive" />
        </NavButton>
        <NavButton onClick={navToSetting}>
          <Settings className="size-6" />
        </NavButton>
      </div>
    </div>
  );
}
