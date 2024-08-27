"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RouteHome({ userId }: { userId: string }) {
  const router = useRouter();
  const goBack = () => {
    router.push(`/home/${userId}`);
  };
  return (
    <div>
      <X onClick={goBack} />
    </div>
  );
}

export function RouteDetail({
  userId,
  postId,
}: {
  userId: string;
  postId: number;
}) {
  const router = useRouter();
  const goDetail = () => {
    router.push(`/detail/${userId}/${postId}`);
  };
  return (
    <div>
      <X onClick={goDetail} />
    </div>
  );
}
