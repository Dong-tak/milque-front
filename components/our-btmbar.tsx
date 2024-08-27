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
  Link,
  LogIn,
  LogOut,
  Pin,
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
import cookie from "cookie";

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
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { SidebarBtn } from "./our-sidebar";
import { Input } from "./ui/input";

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
  onClick?: () => void;
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

interface OurBtmBarProps {
  params: string;
}

export function OurBtmBar({ params }: { params: OurBtmBarProps }) {
  const user_id = params;
  const router = useRouter();
  const pathname = usePathname();
  const [contentUrl, setContentUrl] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentUrl(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const cookies = cookie.parse(document.cookie);
      const accessToken = cookies.accessToken;
      console.log(accessToken);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/${user_id}/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify([
            {
              content_url: contentUrl,
              comment: "Comment를 입력하세요.",
            },
          ]),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save the content");
      }

      const data = await response.json();
      console.log("Data saved successfully:", data);
      window.location.reload();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const navToHome = () => {
    router.push(`/home/${user_id}`);
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
      <Dialog>
        <DialogTrigger asChild>
          {user_id ? (
            <NavButton>
              <SquarePlus className="icon mr-2 size-4" />
            </NavButton>
          ) : (
            <NavButton disabled>
              <SquarePlus className="icon mr-2 size-4" />
            </NavButton>
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
            <Button type="submit" onClick={handleSaveClick}>
              저장하기
              <Pin className="icon ml-2 size-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <NavButton onClick={navToGroup} isActive={pathname === "/group"}>
        <HeartHandshake className="size-6" />
      </NavButton>
      <NavButton onClick={navToProfile} isActive={pathname === "/profile"}>
        <Ghost className="size-6" />
      </NavButton>
    </div>
  );
}
