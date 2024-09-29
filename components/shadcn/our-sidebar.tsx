"use client";

import {
  ArrowLeft,
  Bell,
  Bookmark,
  Calendar,
  ChevronLeft,
  Compass,
  FileDown,
  Ghost,
  HeartHandshake,
  Link,
  Pin,
  Settings,
  SquarePlus,
  UserPlus,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { SqBadge, Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { SidebarDropdownBtn } from "./sidebar-dropdown";
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
import { MilequeFullLogo, MilequeSmallLogo } from "@/public/svgBag";
import { DataFetchInClient } from "../../app/api/postdata-client";
import { SidebarBtn } from "./sidebar-btn";
import { RoutePage } from "../route-setting";
import { OurOption } from "../setting/our-option";
import { BasicAlert } from "../alert/basic-alert";
import SocialLinkDialog from "../setting/sidebar-modul/sociallink-dialog";
import { openSidebar, toggleSidebar } from "@/redux/features/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export function OurSidebar({
  noti,
  user_id,
}: {
  noti?: number;
  user_id?: number;
}) {
  const pathname = usePathname();
  const [contentUrl, setContentUrl] = useState("");
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen); // Redux 상태에서 isOpen 값을 가져옴
  const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/${user_id}/create/`;
  const bodyData = [
    {
      content_url: contentUrl,
      comment: "Comment를 입력하세요.",
    },
  ];

  // 미디어 쿼리 상태를 관리하는 useEffect
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 764px) and (max-width: 1100px)",
    );

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // 764px ~ 1100px 사이에 있을 때 sidebar 열기
        dispatch(openSidebar());
      }
    };

    // 최초 실행 시 체크
    if (mediaQuery.matches) {
      dispatch(openSidebar());
    }

    // 리스너 등록
    mediaQuery.addEventListener("change", handleMediaChange);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContentUrl(e.target.value);
  };

  const handleSaveClick = async () => {
    await DataFetchInClient({ apiUrl, bodyData, isReload: true });
  };

  // 애니메이션 추가 함수
  const toggleSidebarState = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div
      className={`sidebar fixed left-0 top-0 z-50 h-full w-[250px] flex-col justify-between border-r ${
        isOpen ? "sidebar-open" : "sidebar-close"
      }`}
    >
      <div>
        <div className="p-2">
          <SidebarBtn
            onClick={RoutePage(`/home/${user_id}`)}
            className="hover:bg-background hover:text-popover-foreground"
          >
            <div className="xl:hidden">
              <MilequeSmallLogo />
            </div>
            <div className="hidden w-full xl:block">
              <div className="flex justify-between">
                <MilequeFullLogo />
                <ChevronLeft
                  className="icon ml-2 size-4"
                  onClick={toggleSidebarState}
                />
              </div>
            </div>
          </SidebarBtn>
        </div>
        <div className="flex flex-col p-2">
          <SidebarBtn
            onClick={RoutePage(`/home/${user_id}`)}
            isActive={pathname === `/home/${user_id}`}
          >
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
            <DialogContent className="w-full gap-5 rounded-md bg-popover p-6">
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
            onClick={RoutePage(`/group/${user_id}`)}
            disabled
          >
            <div className="flex items-center">
              <HeartHandshake className="icon mr-2 size-4" />
              <span>그룹</span>
            </div>
            <SqBadge variant={"gray"}>준비중</SqBadge>
          </SidebarBtn>
          <SidebarDropdownBtn pos="left" />
        </div>
        <div className="direct flex flex-col p-2">
          <Label className="sidebar-label px-4 py-2 others-medium-button">
            바로가기
          </Label>
          <SocialLinkDialog
            button={
              <SidebarBtn>
                <Link className="mr-2 size-4" />
                <span>계정 연동</span>
              </SidebarBtn>
            }
          />
          <BasicAlert
            button={
              <SidebarBtn
                disabled
                className="flex items-center justify-between"
              >
                <div className="flex">
                  <UserPlus className="mr-2 size-4" />
                  <span>초대하기</span>
                </div>
                <SqBadge variant={"gray"}>준비중</SqBadge>
              </SidebarBtn>
            }
            dialogDescription="친구의 아이디를 입력해주세요."
            dialogTitle="친구요청"
            placeholder="친구의 아이디를 입력해주세요."
          />
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <Separator />
        <div className="flex flex-col p-2">
          <OurOption
            button={
              <SidebarBtn>
                <Ghost className="icon mr-2 size-4" />
                <span>프로필</span>
              </SidebarBtn>
            }
          />
          <SidebarBtn className="flex justify-between">
            <div className="flex items-center">
              <Bell className="icon mr-2 size-4" />
              <span>알림</span>
            </div>
            {noti ? <Badge variant={"default"}>{noti}</Badge> : null}
          </SidebarBtn>
          <OurOption
            button={
              <SidebarBtn>
                <Settings className="icon mr-2 size-4" />
                <span>설정</span>
              </SidebarBtn>
            }
            user_id={user_id}
          />
        </div>
      </div>
    </div>
  );
}
