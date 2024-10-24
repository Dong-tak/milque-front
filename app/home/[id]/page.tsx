import { OurAccordion } from "@/components/shadcn/our-accordion";
import { OurBtmBar } from "@/components/shadcn/our-btmbar";
import { OurSidebar } from "@/components/shadcn/our-sidebar";
import { OurTopBar } from "@/components/shadcn/our-topbar";
import { getPostData } from "@/app/api/feed-api";

export default async function HomePage({ params }: { params: { id: number } }) {
  const userId = params.id;

  const data = await getPostData({ userId });
  const posts = data?.data?.posts || [];
  const noti = data?.data?.notifications || 0;

  return (
    <div>
      <OurBtmBar user_id={userId} />
      <OurTopBar user_id={userId} />
      <OurSidebar noti={noti} user_id={userId} />
      <OurAccordion posts={posts} userId={userId} />
    </div>
  );
}
