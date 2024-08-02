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

export default function SideBar() {
  const pathname = usePathname();
  const isTeam = pathname.startsWith("/team");
  const isTeamList = pathname === "/team/list";
  return (
    <div className="flex flex-col items-start fixed left-0 top-0 h-full w-[243px] bg-basic-100 shadow-inner-r shadow-black">
      <div className="p-6">
        <div className="text-start text-basic-800 text-[32px] font-bold leading-[48px]">
          마일퀘
        </div>
        <div>마케터의 일일 퀘스트</div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex flex-col flex-grow">
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? "sideOnTap flex gap-2.5 "
                : "sideOffTap flex gap-2.5"
            }
          >
            <HomeIcon className="size-6" />
            <span>홈</span>
          </Link>
          <div>
            <div className="flex flex-col">
              <Link
                href={"/team"}
                className={`h-[51px] w-[243px] px-6 py-3 ${
                  isTeam
                    ? "bg-primary-90 shadow-inner-tr shadow-black"
                    : "sideOffTap"
                } justify-start items-center inline-flex text-lg font-semibold text-basic-800 gap-2.5`}
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
                } justify-start items-center inline-flex text-lg ${
                  isTeamList ? "font-semibold" : "font-normal"
                } text-basic-800 gap-2.5`}
              >
                <div className="size-6" />
                <span>FanRose</span>
              </Link>
            </div>
            <Link
              href={"/team/list"}
              className={
                pathname === "/team" || pathname === "/team/list"
                  ? "h-[51px] w-[243px] px-12 py-3  justify-start items-center inline-flex text-lg font-normal text-basic-600 gap-2.5"
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
        <div className="pl-6 pb-6">
          <Grass />
        </div>
      </div>
      <div className="flex flex-col left-0 bottom-0  py-6 shadow-inner-tr">
        <div className="w-[243px] h-[51px] px-10 py-3 justify-start items-center gap-2.5 inline-flex ">
          <PlusCircleIcon className="size-6 p-0.5 justify-start items-start flex" />
          <div className="grow shrink basis-0 text-basic-800 text-lg font-normal leading-[27px]">
            계정 등록하기
          </div>
        </div>
        <div className="w-[243px] h-[51px] px-10 py-3 justify-start items-center gap-2.5 inline-flex">
          <UserPlusIcon className="size-6 p-0.5 justify-start items-start flex" />
          <div className="grow shrink basis-0 text-basic-800 text-lg font-normal leading-[27px]">
            친구 초대하기
          </div>
        </div>
        <div className="w-[243px] h-[51px] px-10 py-3 justify-start items-center gap-2.5 inline-flex">
          <Cog8ToothIcon className="size-6 p-0.5 justify-start items-start flex" />
          <div className="grow shrink basis-0 text-basic-800 text-lg font-normal leading-[27px]">
            설정
          </div>
        </div>
      </div>
    </div>
  );
}
