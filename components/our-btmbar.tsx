"use client";

import {
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
import { usePathname, useRouter } from "next/navigation";
import { Badge, SqBadge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

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
  isActive = false,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
}) {
  return (
    <Button
      variant="background"
      size={"nav"}
      disabled={disabled}
      className={cn(
        "w-full border-none hover:text-accent-foreground",
        isActive && "text-accent-foreground",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function OurBtmBar() {
  const router = useRouter();
  const pathname = usePathname();

  const navToHome = () => {
    router.push("/");
    console.log("click!!!");
  };
  const navToAdd = () => {
    router.push("/add");
  };
  const navToGroup = () => {
    router.push("/group");
  };
  const navToProfile = () => {
    router.push("/profile");
  };
  const navToSetting = () => {
    router.push("/setting");
  };
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
    <div className="btm-bar fixed bottom-0 z-50 flex w-full border-t bg-background">
      <NavButton onClick={navToHome} isActive={pathname === "/"}>
        <Calendar className="size-6" />
      </NavButton>
      <NavButton onClick={navToHome} disabled>
        <Compass className="size-6" />
      </NavButton>
      <NavButton onClick={navToAdd} isActive={pathname === "/add"}>
        <SquarePlus className="size-6" />
      </NavButton>
      <NavButton onClick={navToGroup} isActive={pathname === "/group"}>
        <HeartHandshake className="size-6" />
      </NavButton>
      <NavButton onClick={navToProfile} isActive={pathname === "/profile"}>
        <Ghost className="size-6" />
      </NavButton>
    </div>
  );
}
