"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CloudDownload, ExternalLink, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { SqBadge } from "../ui/badge";
import { PostFeed } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setGroupedPosts } from "@/store";

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

const groupPostsByDate = (posts: PostFeed[]): Record<string, PostFeed[]> => {
  if (!Array.isArray(posts)) {
    console.error("posts is not an array");
    return {};
  }
  return posts.reduce((acc: Record<string, PostFeed[]>, post: PostFeed) => {
    const dateKey = post.date.split("T")[0]; // Extract date part (YYYY-MM-DD)
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(post);
    return acc;
  }, {});
};

const sortPostsByTime = (groupedPosts: Record<string, PostFeed[]>) => {
  Object.keys(groupedPosts).forEach((date) => {
    groupedPosts[date].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  });
  return groupedPosts;
};

export function OurAccordion({
  posts,
  userId,
}: {
  posts: PostFeed[];
  userId: number;
}) {
  const [isShared, setIsShared] = useState(false);
  const handleShare = () => {
    setIsShared(!isShared);
  };

  const dispatch = useDispatch();

  const groupedPosts = sortPostsByTime(groupPostsByDate(posts));

  const sortedDateKeys = Object.keys(groupedPosts).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  useEffect(() => {
    dispatch(setGroupedPosts(groupedPosts));
  }, [groupedPosts, dispatch]);

  const router = useRouter();

  const handlePostClick = (postId: number) => {
    router.push(`/detail/${userId}/${postId}`);
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
                  id="accordion-content"
                >
                  <Image
                    src={post.thumbnail || "/netflex.jpg"}
                    alt={`${post.media} thumbnail`}
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
                    <div className="flex gap-2">
                      <div className="accordhead others-medium-title">
                        {post.title || "제목 없음"}
                      </div>
                      {/* <SqBadge variant={"secondary"}>NEW</SqBadge> */}
                    </div>
                    <div className="accordbody body-normal-body-long-01">
                      {post.comments.length > 0
                        ? post.comments[0].comment
                        : "이 콘텐츠에 대한 설명이 없습니다."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
