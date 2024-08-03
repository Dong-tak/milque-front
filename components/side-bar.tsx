"use client";

import {
  Cog8ToothIcon,
  FolderIcon,
  HomeIcon,
  PlusCircleIcon,
  PlusIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Grass from "./mileque-grass";
import { useState } from "react";
import AccountPlusModal from "./account-plus";

export default function SideBar() {
  const pathname = usePathname();
  const isTeam = pathname.startsWith("/team");
  const isTeamList = pathname === "/team/list";
  const [isAccountPlus, setIsAccountPlus] = useState(false);
  const clickAccountPlus = () => setIsAccountPlus(!isAccountPlus);
  const closeModal = () => setIsAccountPlus(false);
  return (
    <div className="fixed left-0 top-0 flex h-full w-[243px] flex-col items-start bg-basic-100 shadow-inner-r shadow-black">
      <div className="p-6">
        <div className="text-start text-[32px] font-bold leading-[48px] text-basic-800">
          마일퀘
        </div>
        <div>마케터의 일일 퀘스트</div>
      </div>
      <div className="flex h-full flex-col">
        <div className="flex flex-grow flex-col">
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? "sideOnTap flex gap-2.5"
                : "sideOffTap flex gap-2.5"
            }
          >
            <HomeIcon className="size-6" />
            <span>홈</span>
          </Link>
          <div>
            <div className="flex flex-col">
              <Link
                href={"/team/list"}
                className={`h-[51px] w-[243px] px-6 py-3 ${
                  isTeam
                    ? "bg-primary-90 shadow-inner-tr shadow-black"
                    : "sideOffTap"
                } inline-flex items-center justify-start gap-2.5 text-lg font-semibold text-basic-800`}
              >
                <UsersIcon className="size-6" />
                <span>팀</span>
              </Link>
              <Link
                href={"/team/list"}
                className={`h-[51px] w-[243px] px-6 py-3 ${
                  isTeam
                    ? "bg-primary-95 shadow-inner-br shadow-black"
                    : "hidden"
                } inline-flex items-center justify-start text-lg ${
                  isTeamList ? "font-semibold" : "font-normal"
                } gap-2.5 text-basic-800`}
              >
                <div className="size-6" />
                <span>FanRose</span>
              </Link>
            </div>
            <Link
              href={"/team/list"}
              className={
                pathname === "/team" || pathname === "/team/list"
                  ? "inline-flex h-[51px] w-[243px] items-center justify-start gap-2.5 px-12 py-3 text-lg font-normal text-basic-600"
                  : "hidden"
              }
            >
              <PlusIcon className="size-6" />
              <span>팀 생성하기</span>
            </Link>
          </div>
          <Link
            href={"/storage"}
            className={
              pathname === "/storage"
                ? "sideOnTap flex gap-2.5"
                : "sideOffTap flex gap-2.5"
            }
          >
            <FolderIcon className="size-6" />
            <span>보관함</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="sideOffTap">최근활동</div>
        <div className="pb-6 pl-6">
          <Grass />
        </div>
      </div>
      <div className="bottom-0 left-0 flex flex-col py-6 shadow-inner-tr">
        <div
          onClick={clickAccountPlus}
          className="inline-flex h-[51px] w-[243px] items-center justify-start gap-2.5 px-10 py-3 hover:cursor-pointer"
        >
          <PlusCircleIcon className="flex size-6 items-start justify-start p-0.5" />
          <div className="shrink grow basis-0 text-lg font-normal leading-[27px] text-basic-800">
            계정 등록하기
          </div>
        </div>
        <div className="inline-flex h-[51px] w-[243px] items-center justify-start gap-2.5 px-10 py-3">
          <UserPlusIcon className="flex size-6 items-start justify-start p-0.5" />
          <div className="shrink grow basis-0 text-lg font-normal leading-[27px] text-basic-800">
            친구 초대하기
          </div>
        </div>
        <div className="inline-flex h-[51px] w-[243px] items-center justify-start gap-2.5 px-10 py-3">
          <Cog8ToothIcon className="flex size-6 items-start justify-start p-0.5" />
          <div className="shrink grow basis-0 text-lg font-normal leading-[27px] text-basic-800">
            설정
          </div>
        </div>
        {isAccountPlus && <AccountPlusModal onClose={closeModal} />}
      </div>
    </div>
  );
}
