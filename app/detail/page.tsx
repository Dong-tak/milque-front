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

export default function DetailPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-500 py-6">
      <div className="hidden md:block">
        <Button variant="outline" size={"icon"} className="mx-5">
          <ChevronLeft className="size-4" />
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="hidden h-screen max-h-[729px] w-full py-6 md:block">
          <div className="flex h-full w-auto items-center overflow-hidden md:block">
            <InstagramFeedEmbed
              url={"https://www.instagram.com/p/C-dNdiKMYfY/"}
            />
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
