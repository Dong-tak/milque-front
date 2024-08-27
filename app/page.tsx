"use client";

import { OurAccordion } from "@/components/our-accordion";
import { OurBtmBar } from "@/components/our-btmbar";
import { OurSidebar } from "@/components/our-sidebar";
import { OurTopBar } from "@/components/our-topbar";

import { getPostData } from "./api/feed-api";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  const goLogin = () => {
    router.push("/login");
  };
  const goSignup = () => {
    router.push("/signup");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <OurSidebar />
      <OurBtmBar user_id="" />
      <OurTopBar user_id="" />
      <div>
        <Button onClick={goLogin}>로그인하러가기</Button>
      </div>
      <div>
        <Button onClick={goSignup}>회원가입 하러가기</Button>
      </div>
    </div>
  );
}
