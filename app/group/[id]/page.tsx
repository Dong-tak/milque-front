"use client";

import { OurAccordion } from "@/components/shadcn/our-accordion";
import { OurBtmBar } from "@/components/shadcn/our-btmbar";
import { OurSidebar } from "@/components/shadcn/our-sidebar";
import { OurTopBar } from "@/components/shadcn/our-topbar";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  UserPlus,
  CircleDot,
  DownloadCloud,
  ExternalLink,
  Share2,
} from "lucide-react";
import { FriendRequest } from "@/components/setting/friend-dialog/friend-request";
import { useState } from "react";

const group_count = 243;
const scrap_count = 10332;
const cycle = 3;
const nickname = "벨로이";

export default function GroupPage() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div className="flex h-screen w-full items-start justify-start overflow-hidden overflow-x-scroll">
      <OurSidebar />
      <OurBtmBar user_id="" />
      <OurTopBar user_id="" />
      <div className="ml-0 flex h-screen w-full flex-col pt-[68px] md:ml-[69px] md:pt-5 xl:ml-[250px]">
        {/* 그룹 프로필 */}
        <div className="font-['SUIT Variable'] relative box-border flex w-full flex-row items-start justify-start border-b-[1px] border-solid border-border px-4 pb-10 pt-6 text-left text-5xl text-black">
          <Image
            src={"/images/profile-img.svg"}
            alt="Group"
            width={150}
            height={150}
            className="ml-0 md:ml-16"
          />
          <div className="ml-4 flex w-full flex-col overflow-hidden overflow-x-auto md:ml-16">
            <div className="flex items-start justify-start pb-4 sm:space-x-2">
              <div className="w-[105px] text-2xl font-bold leading-9 text-black">
                유연한뱁새
              </div>
              <div className="flex items-start justify-start">
                <FriendRequest
                  dialogTitle="합류 신청을 하시겠습니까?"
                  dialogDescription="합류 신청할 친구의 아이디를 입력해주세요."
                  button={
                    <Button className="h-9 w-auto items-center gap-2">
                      <UserPlus className="size-4" /> 합류 신청
                    </Button>
                  }
                />
              </div>
            </div>
            <div className="flex h-11 items-start justify-start gap-8">
              <div className="flex h-11 items-center justify-center gap-2 pb-4">
                <div className="font-['SUIT Variable'] inline-block w-full text-base font-normal leading-normal text-black">
                  그룹원
                </div>
                <div className="font-['SUIT Variable'] text-base font-bold leading-normal text-black">
                  {group_count.toLocaleString()}
                </div>
              </div>
              <div className="flex h-11 items-center justify-center gap-2 pb-4">
                <div className="font-['SUIT Variable'] w-full text-base font-normal leading-normal text-black">
                  스크랩
                </div>
                <div className="font-['SUIT Variable'] text-base font-bold leading-normal text-black">
                  {scrap_count.toLocaleString()}
                </div>
              </div>
              <div className="flex h-11 items-center justify-center gap-2 pb-4">
                <div className="font-['SUIT Variable'] w-full text-base font-normal leading-normal text-black">
                  주기
                </div>
                <div className="font-['SUIT Variable'] text-base font-bold leading-normal text-black">
                  {cycle.toLocaleString()}&nbsp;일
                </div>
              </div>
            </div>
            <div className="inline-flex h-[68px] flex-col items-start justify-center gap-2">
              <div className="font-['SUIT Variable'] self-stretch text-sm font-semibold leading-tight text-black">
                저는 {nickname}입니다.
              </div>
              <div className="font-['SUIT Variable'] self-stretch text-sm font-normal leading-tight text-black">
                이러쿵 저러쿵 이야기하는 것을 좋아하는 AE마케터입니다.
                <br />
                저의 인사이트를 나눕니다. 가져가세요.
              </div>
            </div>
          </div>
        </div>
        {/* 그룹 프로필 끝 */}

        {/* 그룹 아코디언 */}

        {/* <OurAccordion posts={posts} userId={userId} /> */}

        <Accordion type="multiple" className="w-full pt-6">
          <AccordionItem value="2022-01-01">
            <div className="sticky top-12 flex items-center justify-between border-b bg-background px-4 py-2 md:top-0">
              <AccordionTrigger>
                2024.07.30 ~ 2024.08.06
                <div className="font-othersmedium-tag relative box-border flex min-h-[24px] shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-md border bg-primary px-2 py-0 text-left text-xs text-primary-foreground">
                  <CircleDot className="size-4" />
                  <div className="relative font-semibold leading-[16px]">
                    LIVE
                  </div>
                </div>
              </AccordionTrigger>

              <div className="flex gap-1">
                <Button className="font-['SUIT Variable'] gap-2 bg-background text-center text-sm font-semibold leading-tight text-slate-900 hover:bg-slate-300">
                  <DownloadCloud className="size-4" />
                  다운로드
                </Button>
                <Button className="font-['SUIT Variable'] gap-2 bg-background text-center text-sm font-semibold leading-tight text-slate-900 hover:bg-slate-300">
                  <ExternalLink className="size-4" />
                  원본열기
                </Button>
                {isButtonClicked ? (
                  <Button
                    className="font-['SUIT Variable'] gap-2 rounded-md border border-slate-300 bg-background text-center text-sm font-semibold leading-tight text-slate-900 hover:bg-slate-300"
                    onClick={handleButtonClick}
                  >
                    <Share2 className="size-4" />
                    공유끊기
                  </Button>
                ) : (
                  <Button
                    className="font-['SUIT Variable'] gap-2 rounded-md border border-slate-300 text-center text-sm font-semibold leading-tight text-primary-foreground"
                    onClick={handleButtonClick}
                  >
                    <Share2 className="size-4" />
                    공유하기
                  </Button>
                )}
              </div>
            </div>
            <AccordionContent>
              <div className="flex flex-col">
                <div className="flex gap-4 rounded-md p-2 hover:cursor-pointer hover:bg-card">
                  <Image
                    src={"/images/thumbnail.svg"}
                    alt="thumbnail"
                    width={128}
                    height={128}
                    className="flex-shrink-0 rounded-sm"
                    style={{
                      objectFit: "cover",
                      width: "128px",
                      height: "128px",
                    }}
                  />
                  <div className="flex flex-col items-start gap-2">
                    <div className="accordhead others-medium-title">
                      제목 없음
                    </div>
                    <div className="accordbody body-normal-body-long-01">
                      이 콘텐츠에 대한 설명이 없습니다.
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* 그룹 아코디언 끝 */}
      </div>
    </div>
  );
}
