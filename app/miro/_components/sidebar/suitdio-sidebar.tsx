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
  Menu,
  Pin,
  Settings,
  SquarePlus,
  UserPlus,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SqBadge, Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MilequeFullLogo, MilequeSmallLogo } from "@/public/svgBag";
import { DataFetchInClient } from "@/app/api/postdata-client";

import { openSidebar, toggleSidebar } from "@/redux/features/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SidebarBtn } from "@/components/shadcn/sidebar-btn";
import { RoutePage } from "@/components/route-setting";
import ScrapDialog from "@/components/sidebar/scrap";
import { SidebarDropdownBtn } from "@/components/shadcn/sidebar-dropdown";
import SocialLinkDialog from "@/components/setting/sidebar-modul/sociallink-dialog";
import { BasicAlert } from "@/components/alert/basic-alert";
import { OurOption } from "@/components/setting/our-option";

export function SuitdioSidebar({
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
    <div>
      <div className="fixed left-0 top-0 z-50 h-10 w-full bg-red-500">
        <Menu
          className={`z-50 h-6 w-6 bg-background ${isOpen ? "hidden" : ""}`}
          onClick={toggleSidebarState}
        />
      </div>
      <div
        className={`sidebar fixed left-0 top-0 z-50 h-full w-[250px] flex-col justify-between border-r ${
          isOpen ? "sidebar-open" : "sidebar-close"
        }`}
      >
        <div>
          <div className="p-2">
            <SidebarBtn className="hover:bg-background hover:text-popover-foreground">
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
          </div>
        </div>
      </div>
    </div>
  );
}
