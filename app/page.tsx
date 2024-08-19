import { OurAccordion } from "@/components/our-accordion";
import { OurBtmBar } from "@/components/our-btmbar";
import { OurSidebar } from "@/components/our-sidebar";
import { OurTopBar } from "@/components/our-topbar";
import { getData } from "./api/feed-api";

export default async function Page() {
  const data = await getData({ user_id: "1" });

  const posts = data?.data?.posts || [];

  return (
    <div>
      <OurSidebar />
      <OurBtmBar />
      <OurTopBar />
      <OurAccordion posts={posts} />
    </div>
  );
}
