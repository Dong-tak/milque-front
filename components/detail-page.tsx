"use client";

import DetailComment from "@/components/detail-comment";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import { getData } from "@/app/api/feed-api";
import { ApiResponse, Post } from "@/lib/types";
import SnsEmbed from "./sns-embed";

export default function DetailPage({ user_id }: { user_id: string }) {
  const router = useRouter();
  const { id } = useParams();
  const [posts, setPosts] = useState<ApiResponse | null>(null);
  console.log("The ID is:", id);
  useEffect(() => {
    const fetchPostData = async () => {
      if (id) {
        try {
          const data = await getData({ data: `${user_id}/${id}` });
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch post data:", error);
        }
      }
    };

    fetchPostData();
  }, [id]);

  const post = posts?.data?.posts[0] || null;
  const comment = post?.comments || null;

  if (!post) return <div>Loading...</div>;

  let backgroundColor = "";
  let itemsArray = "items-start";
  let justifyArray = "justify-end";
  let width = "w-full";

  const form = post.media + post.type;

  if (form === "youtubevideo") {
    backgroundColor = "bg-card";
    itemsArray = "items-center";
    justifyArray = "justify-center";
  } else if (form === "tiktokshorts") {
    backgroundColor = "bg-none";
    itemsArray = "items-center";
    justifyArray = "";
    width = "w-auto";
  }

  const goHome = () => {
    router.back();
  };

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-500 py-6">
      <div className="hidden md:block">
        <X
          className="fixed right-8 top-6 size-8 text-background hover:cursor-pointer hover:text-gray-400"
          onClick={goHome}
        />
        <Button variant="outline" size={"icon"} className="mx-5">
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <div className="flex w-full max-w-[1200px] items-center justify-center">
        <div
          className={`hidden h-screen max-h-[785px] ${width} max-w-[514px] py-6 md:block`}
        >
          <div
            className={`flex h-full w-auto rounded-l-md ${backgroundColor} ${itemsArray} ${justifyArray} overflow-hidden`}
          >
            <SnsEmbed form={form} contentUrl={post.contentUrl} />
          </div>
        </div>
        <div className="flex w-auto md:min-w-0">
          <DetailComment post={post} />
        </div>
      </div>
      <div className="hidden md:block">
        <Button variant="outline" size={"icon"} className="mx-5">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
