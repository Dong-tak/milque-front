"use client";

import { OurBtmBar } from "@/components/shadcn/our-btmbar";
import { OurSidebar } from "@/components/shadcn/our-sidebar";
import { OurTopBar } from "@/components/shadcn/our-topbar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.push("/login");
  // }, []);
  return (
    <div className="flex h-screen items-center justify-center gap-8">
      <OurSidebar />
      <OurBtmBar user_id={1} />
      <OurTopBar user_id={1} />
    </div>
  );
}
