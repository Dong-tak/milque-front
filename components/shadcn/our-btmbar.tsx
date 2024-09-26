"use client";

import {
  ArrowLeft,
  Calendar,
  Compass,
  Ghost,
  HeartHandshake,
  Pin,
  SquarePlus,
} from "lucide-react";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { DataFetchInClient } from "@/app/api/postdata-client";
import { RoutePage } from "../route-setting";
import { NavButton } from "./navigation-btn";

export function OurBtmBar({ user_id }: { user_id: number }) {
  const pathname = usePathname();
  const [contentUrl, setContentUrl] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentUrl(e.target.value);
  };

  const handleSaveClick = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/${user_id}/create/`;
    const bodyData = [
      {
        content_url: contentUrl,
        comment: "Comment를 입력하세요.",
      },
    ];
    const data = await DataFetchInClient({ apiUrl, bodyData, isReload: true });
  };

  return (
    <div className="btm-bar fixed bottom-0 z-50 flex w-full border-t bg-background">
      <NavButton
        onClick={RoutePage(`/home/${user_id}`)}
        isActive={pathname === "/"}
      >
        <Calendar className="size-6" />
      </NavButton>
      <NavButton onClick={RoutePage(`/home/${user_id}`)} disabled>
        <Compass className="size-6" />
      </NavButton>
      <Dialog>
        <DialogTrigger asChild>
          {user_id ? (
            <NavButton>
              <SquarePlus className="icon mr-2 size-6" />
            </NavButton>
          ) : (
            <NavButton disabled>
              <SquarePlus className="icon mr-2 size-6" />
            </NavButton>
          )}
        </DialogTrigger>
        <DialogContent className="flex max-h-[220px] w-full flex-col justify-center gap-2 rounded-md bg-popover p-6">
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
      <NavButton
        onClick={RoutePage(`/home/${user_id}`)}
        isActive={pathname === "/group"}
      >
        <HeartHandshake className="size-6" />
      </NavButton>
      <NavButton
        onClick={RoutePage(`/home/${user_id}`)}
        isActive={pathname === "/profile"}
      >
        <Ghost className="size-6" />
      </NavButton>
    </div>
  );
}
