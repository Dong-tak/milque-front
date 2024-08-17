import DetailBtmNav from "@/components/detail-btm-nav";
import DetailComment from "@/components/detail-comment";
import { DetailTopNav } from "@/components/detail-top-nav";
import InstagramFeedEmbed from "@/components/insta-feed";
import InstagramReelsEmbed from "@/components/insta-reels";
import TiktokEmbed from "@/components/tiktok-embed";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { tiktokContent } from "../team/page";
import YouTubeEmbed from "@/components/youtube-video";
import YouTubeShortsEmbed from "@/components/youtube-shorts";

interface DetailPageProps {
  form: "instagram" | "youtubeVid" | "youtubeSht" | "tiktok";
}

export default function DetailPage({ form }: DetailPageProps) {
  let backgroundColor = "";
  let itemsArray = "items-start";
  let justifyArray = "justify-end";
  let width = "w-full";

  if (form === "youtubeVid") {
    backgroundColor = "bg-card";
    itemsArray = "items-center";
    justifyArray = "justify-center";
  } else if (form === "tiktok") {
    backgroundColor = "bg-none";
    itemsArray = "items-center";
    justifyArray = "";
    width = "w-auto";
  }

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-500 py-6">
      <div className="hidden md:block">
        <Button variant="outline" size={"icon"} className="mx-5">
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <div className="flex w-full max-w-[1200px] items-center justify-center">
        <div
          className={`hidden h-screen max-h-[785px] ${width} max-w-[514px] py-6 md:block`}
        >
          <div
            className={`flex h-full w-auto ${backgroundColor} ${itemsArray} ${justifyArray} overflow-hidden`}
          >
            <InstagramFeedEmbed
              url={"https://www.instagram.com/p/C-dNdiKMYfY/"}
            />
            {/* <InstagramReelsEmbed
              url={
                "https://www.instagram.com/reel/C9mPBPSJwGt/?utm_source=ig_web_copy_link/"
              }
            /> */}
            {/* <InstagramFeedEmbed
              url={
                "https://www.instagram.com/p/C8333eatFmY/?utm_source=ig_web_copy_link"
              }
            /> */}
            {/* <TiktokEmbed content={tiktokContent} /> */}
            {/* <YouTubeEmbed url={"5JafqFjBnBU"} /> */}
            {/* <YouTubeShortsEmbed url={"q4IkcMIk70M"} /> */}
          </div>
        </div>
        <div className="flex w-auto md:min-w-0">
          <DetailComment />
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
