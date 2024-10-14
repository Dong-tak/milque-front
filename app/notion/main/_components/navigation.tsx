"use client";

import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import {
  ChevronLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "usehooks-ts";
import Item from "./item";
import { addDocument } from "@/redux/features/documentsSlice";
import { v4 as uuidv4 } from "uuid";
import { DocumentList } from "./document-list";
import { Navbar } from "./navbar";

const Navigation = () => {
  const pathname = usePathname();
  const params = useParams();
  const isResizingRef = useRef(false); // 현재 리사이징 중인지 여부를 추적
  const sidebarRef = useRef<ElementRef<"aside">>(null); // 사이드바 요소에 대한 참조
  const navbarRef = useRef<ElementRef<"div">>(null); // 네비게이션 바 요소에 대한 참조
  const [isResetting, setIsResetting] = useState(false); // 리셋 중인지 여부를 추적
  const [isCollapsed, setIsCollapsed] = useState(true); // 사이드바가 접혀있는지 여부를 추적
  const isMobile = useMediaQuery("(max-width: 768px)"); // 모바일 화면인지 여부를 확인
  const documents = useSelector((state: RootState) => state.documents.items);
  const dispatch = useDispatch();

  // 경로나 모바일 상태가 변경될 때마다 실행
  // 모바일 환경에서는 사이드바를 접음
  // 이는 페이지 전환 시 모바일에서 사이드바가 자동으로 닫히도록 함
  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  // 마우스 다운 이벤트 핸들러 - 리사이징 시작
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // 마우스 이동 이벤트 핸들러 - 사이드바 너비 조절
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    // 최소, 최대 너비 제한
    if (newWidth < 120) newWidth = 120;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`,
      );
    }
  };

  // 마우스 업 이벤트 핸들러 - 리사이징 종료
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // 사이드바 너비 리셋
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      // 모바일 여부에 따라 너비 설정
      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)",
      );
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  // 모바일 여부에 따라 사이드바 상태 변경
  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile, resetWidth]);

  // 사이드바 접기
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const handleCreateNote = () => {
    dispatch(addDocument({ title: "Untitled" }));
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-card",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0",
        )}
      >
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 hover:bg-muted group-hover/sidebar:opacity-100",
            isMobile && "opacity-100",
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </div>
        <div>
          <p className="p-3 text-2xl font-bold">Yotion</p>
          <Item label="Search" icon={Search} isSearch onClick={() => {}} />
          <Item label="Settings" icon={Settings} onClick={() => {}} />
          <Item onClick={handleCreateNote} label="New page" icon={PlusCircle} />
        </div>
        <div id="documents" className="mt-4">
          <DocumentList />
          <Item
            label="Add a page"
            icon={Plus}
            onClick={handleCreateNote}
            isSearch={false}
          />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-nwse-resize bg-neutral-300 opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full",
        )}
      >
        {!!params.documentsId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="flex w-full items-center justify-between space-x-4 bg-transparent px-3 py-2">
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
