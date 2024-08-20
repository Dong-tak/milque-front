"use client";

import {
  ChevronLeft,
  CloudDownload,
  Copy,
  Dot,
  Ellipsis,
  Eye,
  Share2,
  SquarePen,
  Trash2,
} from "lucide-react";
import { DetailTopNav } from "./detail-top-nav";
import DetailBtmNav from "./detail-btm-nav";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import InstagramFeedEmbed from "./insta-feed";
import { useRef, useState } from "react";
import { Comment, Post } from "@/lib/types";
import { DateCalc } from "./date-calc";
import { useRouter } from "next/navigation";
import SnsEmbed from "./sns-embed";

export default function DetailComment({ post }: { post: Post }) {
  const [isEditing, setIsEditing] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async () => {
    const updatedContent = contentEditableRef.current?.innerText;
    setIsEditing(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/comment/${post.postId}/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment: updatedContent,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update the comment");
      }

      // Optionally, you can reload the page or update the state to reflect the new comment
      router.refresh();
    } catch (error) {
      console.error("Failed to update the comment:", error);
    }
  };

  return (
    <div className="relative flex h-screen min-h-[310px] w-screen justify-between py-6 md:max-h-[785px] md:min-w-[310px] md:max-w-[500px]">
      <div className="flex w-full bg-card">
        {/* top nav */}
        <div className="absolute top-0 flex w-full items-center justify-between border-b bg-background md:top-6 md:h-[48px] md:min-w-[310px] md:max-w-[500px] md:px-4">
          <div className="flex items-center">
            <div className="p-3 md:hidden">
              <ChevronLeft className="size-6" />
            </div>
            <span className="accordhead others-medium-title">
              {post.title || "제목이 없습니다."}
            </span>
          </div>
          <div className="flex">
            <div className="flex md:gap-2">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hidden p-1 md:block"
              >
                <CloudDownload className="size-4" />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="rounded-none md:rounded-md md:p-1"
              >
                <Share2 className="size-6 md:size-4" />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hidden p-1 md:block"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="rounded-none md:hidden"
                >
                  <Eye className="size-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{post.title}</DrawerTitle>
                </DrawerHeader>
                <div className="h-[550px] p-3">
                  <SnsEmbed
                    form={post.media + post.type}
                    contentUrl={post.contentUrl}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        {/* comment nav */}
        <div className="flex w-full flex-grow flex-col gap-[2px] overflow-y-auto py-[48px]">
          {post.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-2 border-b-2 border-card bg-background p-4"
            >
              <div className="flex justify-between">
                <div className="flex items-center text-muted-foreground others-medium-tag">
                  <div>@velory</div>
                  <Dot className="size-3" />
                  <div>
                    <DateCalc dateString={comment.updated_at} />
                  </div>
                </div>
                <div className="flex gap-2 text-secondary-foreground">
                  <Copy className="size-4 hover:text-muted-foreground" />
                  <SquarePen
                    onClick={handleEditClick}
                    className="size-4 hover:text-muted-foreground"
                  />
                  <Ellipsis className="size-4 hover:text-muted-foreground" />
                </div>
              </div>
              <div className="body-normal-body-long-01">
                {isEditing ? (
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    ref={contentEditableRef}
                    onBlur={handleBlur}
                    className="w-full rounded border border-gray-300 p-2"
                  >
                    {comment.comment}
                  </div>
                ) : (
                  <span onClick={handleEditClick}>{comment.comment}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* btm nav */}
        <div className="absolute bottom-0 flex h-[48px] w-full items-center justify-between bg-background md:bottom-6 md:min-w-[310px] md:max-w-[500px]">
          <div className="flex w-full gap-4 px-4">
            <Input
              placeholder="새로운 커멘트 남기기"
              className="w-full border-none"
            />
            <Button variant="ghost" className="text-primary">
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
