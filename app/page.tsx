import { OurAccordion } from "@/components/our-accordion";
import { OurBtmBar } from "@/components/our-btmbar";
import { OurSidebar } from "@/components/our-sidebar";
import { OurTopBar } from "@/components/our-topbar";

export default function Page() {
  return (
    <div>
      <OurSidebar />
      <OurBtmBar />
      <OurTopBar />

      <OurAccordion />
    </div>
  );
}
