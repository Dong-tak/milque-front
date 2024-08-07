import AlarmBar from "@/components/alarm-bar";
import ContentsPrev from "@/components/contents-prev";
import { getData } from "./action";
import { Post } from "@/lib/types";

export default async function Home() {
  const posts = await getData();
  return (
    <div className="flex flex-col">
      <AlarmBar />
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 px-12 pb-12 pt-[112px] md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <ContentsPrev key={post.postId} post={post} />
        ))}
      </div>
    </div>
  );
}
