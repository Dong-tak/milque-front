"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RouteBack() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div>
      <X onClick={goBack} />
    </div>
  );
}
