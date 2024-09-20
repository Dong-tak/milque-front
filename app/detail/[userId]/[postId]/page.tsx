import DetailComment from "@/components/detail-view/detail-comment";
import { PostDetail } from "@/lib/types";
import SnsEmbed from "../../../../components/embed/sns-embed";
import { getPostDetailData } from "@/app/api/detail-api";
import RouteHomeWithX from "@/components/route-setting";
import {
  DetailNavigationLeft,
  DetailNavigationRight,
} from "@/components/detail-view/detail-navigation";

export default async function DetailPage({
  params,
}: {
  params: { userId: string; postId: string };
}) {
  const { userId, postId } = params;

  const posts: PostDetail | null = await getPostDetailData({ userId, postId });

  if (!posts) return <div>Loading...</div>;

  const post = posts?.data;

  let backgroundColor = "bg-card";
  let itemsArray = "items-start";
  let justifyArray = "justify-end";
  let width = "w-full";

  const form = post.media + post.type;

  if (form === "youtubevideo") {
    backgroundColor = "bg-card";
    itemsArray = "items-center";
    justifyArray = "justify-center";
  } else if (form === "tiktokvideo") {
    backgroundColor = "bg-none";
    itemsArray = "items-center";
    justifyArray = "";
    width = "w-auto";
  }

  return (
    <div className="flex h-screen items-center justify-center bg-neutral-500 py-6">
      <div className="hidden md:block">
        <div className="fixed right-8 top-6 size-8 text-background hover:cursor-pointer hover:text-gray-400">
          <RouteHomeWithX userId={userId} />
        </div>
        <DetailNavigationLeft userId={userId} postId={postId} />
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
          <DetailComment post={post} params={{ userId, postId }} />
        </div>
      </div>
      <div className="hidden md:block">
        <DetailNavigationRight userId={userId} postId={postId} />
      </div>
    </div>
  );
}
