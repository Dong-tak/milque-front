"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RouteHomeWithX({ userId }: { userId: string }) {
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

export const RoutePage = (routeUrl: string) => {
  const router = useRouter();

  return () => {
    router.push(routeUrl);
  };
};
