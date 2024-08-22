import { OurAccordion } from "@/components/our-accordion";
import { OurBtmBar } from "@/components/our-btmbar";
import { OurSidebar } from "@/components/our-sidebar";
import { OurTopBar } from "@/components/our-topbar";
import { getData } from "./api/feed-api";

export default async function Page() {
  const data = await getData({ data: "1" });

  const posts = data?.data?.posts || [];
  console.log(posts);
  const noti = data?.data?.notifications || 0;

  return (
    <div>
      <OurSidebar noti={noti} user_id={"1"} />
      <OurBtmBar />
      <OurTopBar />
      <OurAccordion posts={posts} />
    </div>
  );
}
