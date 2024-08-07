import { OurAccordion } from "@/components/our-accordion";
import { getData } from "./action";
import { Post } from "@/lib/types";
import { OurAlert } from "@/components/our-alert";

export default async function Home() {
  const posts = await getData();
  return (
    <div className="flex flex-col gap-10 p-8">
      <OurAccordion />
      <OurAlert />
    </div>
  );
}
