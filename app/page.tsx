import { OurAccordion } from "@/components/our-accordion";
import { OurBtmBar } from "@/components/our-btmbar";
import { OurSidebar } from "@/components/our-sidebar";
import { OurTopBar } from "@/components/our-topbar";
import { OurOption } from "@/components/our-option";

export default function Page() {
  return (
    <div>
      <OurSidebar />
      <OurBtmBar />
      <OurTopBar />
      <div className="flex-colitems-center grid justify-center">
        <OurAccordion />
        <div>
          <OurOption />
        </div>
      </div>
    </div>
  );
}
