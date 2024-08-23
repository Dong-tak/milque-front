import { getData } from "@/app/api/feed-api";
import { OurAccordion } from "@/components/our-accordion";
import { OurBtmBar } from "@/components/our-btmbar";
import { OurSidebar } from "@/components/our-sidebar";
import { OurTopBar } from "@/components/our-topbar";

export default async function Page() {
  const data = await getData({ data: "1" });
  const posts = data?.data?.posts || [];
  const noti = data?.data?.notifications || 0;

  return (
    <div>
      <OurSidebar noti={noti} user_id={"1"} />
      <OurBtmBar />
      <OurTopBar />
      <OurAccordion posts={posts} user_id={"1"} />
    </div>
  );
}
