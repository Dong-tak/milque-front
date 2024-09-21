"use client";

import { OurBtmBar } from "@/components/shadcn/our-btmbar";
import { OurSidebar } from "@/components/shadcn/our-sidebar";
import { OurTopBar } from "@/components/shadcn/our-topbar";

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
    <div className="flex h-screen items-center justify-center gap-8">
      <OurSidebar />
      <OurBtmBar user_id={1} />
      <OurTopBar user_id={1} />
      <div>
        <Button onClick={goLogin}>로그인 하러가기</Button>
      </div>
      <div>
        <Button onClick={goSignup}>회원가입 하러가기</Button>
      </div>
    </div>
  );
}
