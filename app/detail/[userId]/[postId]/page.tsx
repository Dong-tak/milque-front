import DetailComment from "@/components/detail-comment";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ApiResponse, PostDetail } from "@/lib/types";
import SnsEmbed from "../../../../components/sns-embed";
import { getPostDetailData } from "@/app/api/detail-api";
import RouteBack from "@/components/route-back";

export default async function DetailPage({
  params,
}: {
  params: { userId: string; postId: string };
}) {
  const { userId, postId } = params;

  const posts: PostDetail | null = await getPostDetailData({ userId, postId });

  if (!posts) return <div>Loading...</div>;

  const post = posts?.data;

  let backgroundColor = "";
  let itemsArray = "items-start";
  let justifyArray = "justify-end";
  let width = "w-full";

  const form = post.media + post.type;
  console.log(post);
  console.log("post.media", post.media);
  console.log("post.type", post.type);
  console.log("form", form);

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

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-500 py-6">
      <div className="hidden md:block">
        <div className="fixed right-8 top-6 size-8 text-background hover:cursor-pointer hover:text-gray-400">
          <RouteBack />
        </div>
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
