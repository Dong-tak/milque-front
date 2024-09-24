"use client";
import { ReactNode, useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { OptionSidebar } from "@/components/setting/option-sidebar";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Menu, ChevronLeft } from "lucide-react";
import { ProfileView } from "@/components/setting/view-profile";
import { DetailedSettingsView } from "@/components/setting/view-detailed-settings";
import { SocialAccountView } from "@/components/setting/view-social-account";
import { NotificationView } from "@/components/setting/view-notification";
import { FriendView } from "@/components/setting/view-friend";
import { DownloadView } from "@/components/setting/view-download";
import { ScrapView } from "@/components/setting/view-scrap";
import { GroupView } from "@/components/setting/view-group";
import { SiteView } from "@/components/setting/view-site";

const DialogClose = DialogPrimitive.Close;

interface OurOptionProps {
  button: ReactNode; // 버튼으로 사용할 컴포넌트 (ex: SidebarBtn)
  user_id?: number;
}

export function OurOption({ button, user_id }: OurOptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
  const [view, setView] = useState("profile");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // 사이드바 토글 함수

  useEffect(() => {
    toggleSidebar();
  }, [view]); // view가 변경될 때마다 toggleSidebar 실행

  type ViewType =
    | "profile"
    | "detailedsettings"
    | "socialaccount"
    | "notification"
    | "download"
    | "friend"
    | "scrap"
    | "group"
    | "site"
    | "default";

  const renderContentView = (view: ViewType): JSX.Element => {
    switch (view) {
      case "profile":
        console.log("profile");
        return <ProfileView />;
      case "detailedsettings":
        console.log("detailedsettings");
        return <DetailedSettingsView />;
      case "socialaccount":
        console.log("socialaccount");
        return <SocialAccountView />;
      case "notification":
        console.log("notification");
        return <NotificationView />;
      case "download":
        console.log("download");
        return <DownloadView />;
      case "friend":
        console.log("friend");
        return <FriendView />;
      case "scrap":
        console.log("scrap");
        return <ScrapView />;
      case "group":
        console.log("group");
        return <GroupView />;
      case "site":
        console.log("site");
        return <SiteView />;
      default:
        console.log("default");
        return <ProfileView />;
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* button prop을 DialogTrigger에 넣어 트리거로 사용 */}
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{button}</div>
      </DialogTrigger>
      {isOpen && (
        <DialogContent className="flex h-full w-full flex-shrink-0 flex-col bg-white shadow-lg md:h-full md:max-h-[70%] md:flex-row lg:max-w-[75%]">
          {/* 상단바 (작은 화면에서만 보임) */}
          <div className="relative z-50 flex max-h-[48px] w-full items-center justify-between bg-background p-4 shadow-md md:hidden">
            <DialogPrimitive.Close>
              <ChevronLeft className="h-6 w-6" />
            </DialogPrimitive.Close>
            <span className="text-center text-xl font-bold">{view}</span>
            <Menu className="h-6 w-6" onClick={toggleSidebar} />
          </div>
          {/* 사이드바 */}
          <div
            className={`${
              isSidebarOpen || window.innerWidth >= 768 ? "block" : "hidden"
            } fixed right-0 top-[50px] z-40 h-full w-[250px] flex-shrink-0 border-l bg-white md:relative md:left-0 md:top-auto md:border-r`}
          >
            <OptionSidebar setView={setView} />
          </div>
          {/* Content view*/}
          <div className="inline-flex h-full w-full flex-col items-center justify-start gap-8 pb-8 pl-4">
            {renderContentView(view as ViewType)}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
