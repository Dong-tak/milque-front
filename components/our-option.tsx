"use client";
import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OptionSidebar } from "@/components/setting/optionsidebar";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Menu, ChevronLeft } from "lucide-react";
import { ProfileView } from "@/components/setting/profileview";
import { AccountListView } from "@/components/setting/accountlistview";

const DialogClose = DialogPrimitive.Close;

export function OurOption() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
  const [view, setView] = useState("profile");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // 사이드바 토글 함수

  type ViewType = "profile" | "accountlist" | "default";

  const renderContentView = (view: ViewType): JSX.Element => {
    switch (view) {
      case "profile":
        console.log("profile");
        return <ProfileView />;
      case "accountlist":
        console.log("accountlist");
        return <AccountListView />;
      default:
        console.log("default");
        return <ProfileView />;
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          옵션설정
        </Button>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="flex h-full w-full max-w-[1136px] flex-shrink-0 flex-col bg-white shadow-lg md:h-full md:max-h-[767px] md:flex-row">
          {/* 상단바 (작은 화면에서만 보임) */}
          <div className="relative z-50 flex max-h-[48px] w-full items-center justify-between bg-background p-4 shadow-md md:hidden">
            <DialogPrimitive.Close>
              <ChevronLeft className="h-6 w-6" />
            </DialogPrimitive.Close>
            <span className="text-center text-xl font-bold">프로필 설정</span>
            <Menu className="h-6 w-6" onClick={toggleSidebar} />
          </div>
          {/* 사이드바 */}
          <div
            className={`${
              isSidebarOpen || window.innerWidth >= 768 ? "block" : "hidden"
            } fixed right-0 z-40 h-full w-[250px] flex-shrink-0 border-b border-l bg-white md:relative md:left-0 md:top-auto md:border-r`}
          >
            <OptionSidebar setView={setView} />
          </div>
          {/* Content view*/}
          <div className="inline-flex h-[767px] w-full flex-col items-center justify-start gap-8 p-8">
            {renderContentView(view as ViewType)}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
