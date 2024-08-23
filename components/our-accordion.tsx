"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CloudDownload, ExternalLink, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { SqBadge } from "./ui/badge";
import { Post } from "@/lib/types";
import { useRouter } from "next/navigation";

interface AccordionBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  size?: "sm" | "lg";
  url?: string;
}

function AccordionBtn({
  children,
  onClick,
  className,
  disabled,
  url,
  asChild = false,
}: AccordionBtnProps & { asChild?: boolean }) {
  const Comp = asChild ? Slot : Button;
  const [isShared, setIsShared] = useState(false);
  const handleShare = () => {
    setIsShared(!isShared);
  };
  return (
    <Comp
      variant={isShared ? "outline" : "default"}
      size="sm"
      className={cn("gap-2", className)}
      onClick={handleShare}
    >
      {children}
    </Comp>
  );
}

function LinkBtn({
  children,
  className,
  disabled,
  url,
  asChild = false,
}: AccordionBtnProps & { asChild?: boolean }) {
  const Comp = asChild ? Slot : Button;
  const onClick = () => {
    console.log(url);
  };
  return (
    <Comp
      size="sm"
      variant={"ghost"}
      onClick={onClick}
      className={cn("hidden md:inline-flex", className)}
      disabled={disabled}
    >
      {children}
    </Comp>
  );
}

const groupPostsByDate = (posts: Post[]): Record<string, Post[]> => {
  if (!Array.isArray(posts)) {
    console.error("posts is not an array");
    return {};
  }
  return posts.reduce((acc: Record<string, Post[]>, post: Post) => {
    const dateKey = post.date.split("T")[0]; // Extract date part (YYYY-MM-DD)
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(post);
    return acc;
  }, {});
};

const sortPostsByTime = (groupedPosts: Record<string, Post[]>) => {
  Object.keys(groupedPosts).forEach((date) => {
    groupedPosts[date].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  });
  return groupedPosts;
};

export function OurAccordion({
  posts,
  user_id,
}: {
  posts: Post[];
  user_id: string;
}) {
  const [isShared, setIsShared] = useState(false);
  const handleShare = () => {
    setIsShared(!isShared);
  };

  const groupedPosts = sortPostsByTime(groupPostsByDate(posts));

  const sortedDateKeys = Object.keys(groupedPosts).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  const router = useRouter();

  const handlePostClick = (postId: number) => {
    router.push(`/detail/${postId}`);
  };

  return (
    <Accordion type="multiple" className="accordion w-full pl-[250px] pt-12">
      {sortedDateKeys.map((dateKey) => (
        <AccordionItem value={dateKey} key={dateKey}>
          <div className="sticky top-12 flex items-center justify-between border-b bg-background p-2 md:top-0">
            <AccordionTrigger>{dateKey.replace(/-/g, ".")}</AccordionTrigger>
            <div className="flex">
              <LinkBtn url="https://www.google.com" className="gap-2">
                <CloudDownload className="size-4" />
                다운로드
              </LinkBtn>
              <LinkBtn url="https://www.google.com">
                <ExternalLink className="size-4" />
                원본열기
              </LinkBtn>
              <AccordionBtn size="sm">
                <Share2 className="size-4" />
                <span>{isShared ? "공유중" : "공유하기"}</span>
              </AccordionBtn>
            </div>
          </div>
          <AccordionContent>
            <div className="flex flex-col">
              {groupedPosts[dateKey].map((post) => (
                <div
                  key={post.postId}
                  className="flex gap-4 rounded-md p-2 hover:cursor-pointer hover:bg-card"
                  onClick={() => handlePostClick(post.postId)}
                >
                  <Image
                    src={post.thumbnail || "/netflex.jpg"}
                    alt={`${post.media} thumbnail`}
                    width={128}
                    height={128}
                    className="rounded-sm"
                    style={{
                      objectFit: "cover",
                      width: "128px",
                      height: "128px",
                    }}
                  />
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex gap-2">
                      <div className="accordhead others-medium-title">
                        {post.title || "제목 없음"}
                      </div>
                      {/* <SqBadge variant={"secondary"}>NEW</SqBadge> */}
                    </div>
                    <div className="accordbody body-normal-body-long-01">
                      {post.comments[0].comment ||
                        "이 콘텐츠에 대한 설명이 없습니다."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

    //   <AccordionItem value="item-1">
    //     <div className="sticky top-12 flex items-center justify-between border-b bg-background p-2 md:top-0">
    //       <AccordionTrigger>24.07.30</AccordionTrigger>
    //       <div className="flex">
    //         <LinkBtn url="https://www.google.com" className="gap-2">
    //           <CloudDownload className="size-4" />
    //           다운로드
    //         </LinkBtn>
    //         <LinkBtn url="https://www.google.com">
    //           <ExternalLink className="size-4" />
    //           원본열기
    //         </LinkBtn>
    //         <AccordionBtn size="sm">
    //           <Share2 className="size-4" />
    //           <span>{isShared ? "공유중" : "공유하기"}</span>
    //         </AccordionBtn>
    //       </div>
    //     </div>
    //     <AccordionContent>
    //       <div className="flex flex-col gap-4">
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start gap-2">
    //             <div className="flex gap-2">
    //               <div className="accordhead others-medium-title">
    //                 프리랜서의 성공 비결:프리랜서의 성공 비결:프리랜서의 성공
    //                 비결:프리랜서의 성공 비결:
    //               </div>
    //               <SqBadge variant={"secondary"}>NEW</SqBadge>
    //             </div>
    //             <div className="accordbody body-normal-body-long-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이
    //               블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심
    //               습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는
    //               개인적 성취와 전문적 성장을 위한 기초를 마련합니다. 두 번째
    //               습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을
    //               극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강
    //               유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은
    //               능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기
    //               계발입니다. 새로운 기술과 지식은 경쟁력을 높이고 삶의 질을
    //               향상시킵니다. 마지막으로 다섯 번째 습관은 일상 속에서의 작은
    //               목표 달성을 통해 성취감을 느끼는 것입니다. 이러한 습관들은
    //               개인의 성장과 발전에 필수적이며, 이 글을 통해 자기 계발의 길을
    //               찾는 데 도움을 줄 것입니다.
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </AccordionContent>
    //   </AccordionItem>
    //   <AccordionItem value="item-2">
    //     <div className="sticky top-0 flex items-center justify-between border-b bg-background p-2">
    //       <AccordionTrigger>24.07.29</AccordionTrigger>
    //       <div className="flex">
    //         <LinkBtn url="https://www.google.com" className="gap-2">
    //           <CloudDownload className="size-4" />
    //           다운로드
    //         </LinkBtn>
    //         <LinkBtn url="https://www.google.com">
    //           <ExternalLink className="size-4" />
    //           원본열기
    //         </LinkBtn>
    //         <AccordionBtn size="sm">
    //           <Share2 className="size-4" />
    //           <span>{isShared ? "공유중" : "공유하기"}</span>
    //         </AccordionBtn>
    //       </div>
    //     </div>
    //     <AccordionContent>
    //       <div className="flex flex-col gap-4">
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start gap-2">
    //             <div className="flex gap-2">
    //               <div className="accordhead others-medium-title">
    //                 프리랜서의 성공 비결:프리랜서의 성공 비결:프리랜서의 성공
    //                 비결:프리랜서의 성공 비결:
    //               </div>
    //               <SqBadge variant={"secondary"}>NEW</SqBadge>
    //             </div>
    //             <div className="accordbody body-normal-body-long-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다. 이
    //               블로그 포스트에서는 일상 생활에 쉽게 통합할 수 있는 5가지 핵심
    //               습관을 소개합니다. 첫 번째는 목표 설정과 시간 관리입니다. 이는
    //               개인적 성취와 전문적 성장을 위한 기초를 마련합니다. 두 번째
    //               습관은 긍정적 사고를 통한 자기 격려입니다. 이는 도전을
    //               극복하고 성공으로 나아가는 데 중요합니다. 세 번째는 건강
    //               유지를 위한 일상적인 운동과 균형 잡힌 식단입니다. 건강한 몸은
    //               능률적인 마음의 기초입니다. 네 번째는 지속적인 학습과 자기
    //               계발입니다. 새로운 기술과 지식은 경쟁력을 높이고 삶의 질을
    //               향상시킵니다. 마지막으로 다섯 번째 습관은 일상 속에서의 작은
    //               목표 달성을 통해 성취감을 느끼는 것입니다. 이러한 습관들은
    //               개인의 성장과 발전에 필수적이며, 이 글을 통해 자기 계발의 길을
    //               찾는 데 도움을 줄 것입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //         <div className="flex gap-4">
    //           <Image
    //             src="/netflex.jpg"
    //             alt="netflex"
    //             width={128}
    //             height={128}
    //             className="rounded-sm"
    //           />
    //           <div className="flex flex-col items-start">
    //             <div className="others-medium-title">프리랜서의 성공 비결:</div>
    //             <div className="body-normal-body-01">
    //               자기 개발은 목표를 설정하고 달성하기 위한 여정입니다.
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </AccordionContent>
    //   </AccordionItem>
    //   <AccordionItem value="item-3">
    //     <AccordionTrigger>Is it animated?</AccordionTrigger>
    //     <AccordionContent>
    //       Yes. It&apos;s animated by default, but you can disable it if you
    //       prefer.
    //     </AccordionContent>
    //   </AccordionItem>
    // </Accordion>
  );
}
