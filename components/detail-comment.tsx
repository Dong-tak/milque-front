"use client";

import {
  ChevronLeft,
  CloudDownload,
  Copy,
  Dot,
  Eye,
  Share2,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useRef, useState } from "react";
import { Comment, PostFeed } from "@/lib/types";
import { DateCalc } from "./date-calc";
import { useRouter } from "next/navigation";
import SnsEmbed from "./sns-embed";
import cookie from "cookie";
import { DataFetchInClient } from "../app/api/postdata-client";

export default function DetailComment({
  params,
  post,
}: {
  post: PostFeed;
  params: { userId: string; postId: string };
}) {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [newComment, setnewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const router = useRouter();
  const { userId, postId } = params;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewComment(e.target.value);
  };

  const handleEditClick = (commentId: number) => {
    setIsEditing(commentId);
  };

  const handleDeleteComment = async (commentId: number) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/comment/${commentId}/delete/`;
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
    await DataFetchInClient({ apiUrl, method: "DELETE" });
  };

  const handleDeletePost = async ({
    userId,
    postId,
  }: {
    userId: string;
    postId: string;
  }) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/${userId}/post/${postId}/delete/`;
    const goHome = `/home/${userId}`;
    await DataFetchInClient({ apiUrl, method: "DELETE", goHome });
    // try {
    //   const accessCookies = document.cookie.split("accessToken=")[1];
    //   const refreshCookies = document.cookie.split("refreshToken=")[1];
    //   const accessToken = accessCookies;
    //   const refreshToken = refreshCookies;

    //   const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/${userId}/post/${postId}/delete/`,
    //     {
    //       method: "DELETE",
    //       credentials: "include",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken} ${refreshToken}`,
    //       },
    //     },
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to delete the post");
    //   }
    //   window.location.href = `/home/${userId}`;
    //   const data = await response.json();
    //   console.log("post deleted successfully:", data);
    // } catch (error) {
    //   console.error("Error saving data:", error);
    // }
  };

  const handleSaveClick = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/comment/${post.postId}/add/`;
    const bodyData = {
      comment: newComment,
    };
    const data = await DataFetchInClient({ apiUrl, bodyData, method: "POST" });
    if (data) {
      const newCommentObject = {
        id: data.data.id,
        comment: newComment,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_deleted: false,
      };

      // 새로운 댓글을 UI에 즉시 추가
      setComments((prevComments) => [...prevComments, newCommentObject]);
      setnewComment("");

      if (comments[0].comment === "Comment를 입력하세요.") {
        handleDeleteComment(comments[0].id);
      }
    }
  };

  const handleBlur = async (commentId: number) => {
    const updatedContent = contentEditableRef.current?.innerText;
    setIsEditing(null);
    const apiUrl = `${process.env.NEXT_PUBLIC_POST_API_URL}/feed/comment/${commentId}/edit/`;
    const bodyData = {
      comment: updatedContent,
    };

    if (!updatedContent) return;

    await DataFetchInClient({
      apiUrl,
      bodyData,
      method: "PATCH",
      isReload: false,
    });

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, comment: updatedContent }
          : comment,
      ),
    );
  };

  const handleCopyClick = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Comment copied to clipboard!"); // You can customize this alert or use a toast notification instead
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="relative flex h-screen min-h-[310px] w-screen justify-between py-6 md:max-h-[785px] md:min-w-[310px] md:max-w-[500px]">
      <div className="flex w-full bg-card">
        {/* top nav */}
        <div className="absolute top-0 flex w-full items-center justify-between border-b bg-background md:top-6 md:h-[48px] md:min-w-[310px] md:max-w-[500px] md:px-4">
          <div className="flex items-center">
            <div
              className="p-3 hover:bg-card md:hidden"
              onClick={handleBackClick}
            >
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
                disabled
              >
                <CloudDownload className="size-4" />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="rounded-none md:rounded-md md:p-1"
                disabled
              >
                <Share2 className="size-6 md:size-4" />
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hidden p-1 md:block"
              >
                <Trash2
                  className="size-4"
                  onClick={() => handleDeletePost({ userId, postId })}
                />
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
        {comments.length > 0 ? (
          <div className="flex w-full flex-grow flex-col gap-[2px] overflow-y-auto py-[48px]">
            {comments.map((comment) => (
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
                    <Copy
                      className="size-4 hover:text-muted-foreground"
                      onClick={() => handleCopyClick(comment.comment)}
                    />
                    <SquarePen
                      onClick={() => handleEditClick(comment.id)}
                      className="size-4 hover:text-muted-foreground"
                    />
                    <Trash2
                      className="size-4 hover:text-muted-foreground"
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                  </div>
                </div>
                <div className="body-normal-body-long-01">
                  {isEditing === comment.id ? (
                    <div
                      ref={contentEditableRef}
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={() => handleBlur(comment.id)}
                      className="w-full border-b p-2"
                    >
                      {comment.comment}
                    </div>
                  ) : (
                    <span onClick={() => handleEditClick(comment.id)}>
                      {comment.comment}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {/* btm nav */}
        <div className="absolute bottom-0 flex h-[48px] w-full items-center justify-between bg-background md:bottom-6 md:min-w-[310px] md:max-w-[500px]">
          <div className="flex w-full gap-4 px-4">
            <Input
              placeholder="새로운 커멘트 남기기"
              value={newComment}
              className="w-full border-none"
              onChange={handleInputChange}
            />
            <Button
              variant="ghost"
              className="text-primary"
              onClick={handleSaveClick}
              id="comment-submit"
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
