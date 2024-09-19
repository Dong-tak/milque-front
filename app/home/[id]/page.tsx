import { OurAccordion } from "@/components/our-accordion";
import { OurBtmBar } from "@/components/our-btmbar";
import { OurSidebar } from "@/components/our-sidebar";
import { OurTopBar } from "@/components/our-topbar";
import { getPostData } from "@/app/api/feed-api";

export default async function HomePage({ params }: { params: { id: string } }) {
  const userId = params.id;

  const data = await getPostData({ userId });
  const posts = data?.data?.posts || [];
  const noti = data?.data?.notifications || 0;

  return (
    <div>
      <OurSidebar noti={noti} user_id={userId} />
      <OurBtmBar user_id={userId} />
      <OurTopBar user_id={userId} />
      <OurAccordion posts={posts} userId={userId} />
    </div>
  );
}
