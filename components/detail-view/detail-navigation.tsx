"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function DetailNavigationLeft({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  const groupedPosts = useSelector(
    (state: RootState) => state.posts.groupedPosts,
  );

  const allPosts = Object.values(groupedPosts).flat();
  const currentIndex = allPosts.findIndex(
    (post) => post.postId.toString() === postId,
  );

  const router = useRouter();

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousPostId = allPosts[currentIndex - 1].postId;
      router.push(`/detail/${userId}/${previousPostId}`);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size={"icon"}
        onClick={handlePrevious}
        className="mx-5"
      >
        <ChevronLeft className="size-4" />
      </Button>
    </>
  );
}

export function DetailNavigationRight({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  const groupedPosts = useSelector(
    (state: RootState) => state.posts.groupedPosts,
  );

  const allPosts = Object.values(groupedPosts).flat();
  const currentIndex = allPosts.findIndex(
    (post) => post.postId.toString() === postId,
  );
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < allPosts.length - 1) {
      const nextPostId = allPosts[currentIndex + 1].postId;
      router.push(`/detail/${userId}/${nextPostId}`);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size={"icon"}
        onClick={handleNext}
        className="mx-5"
      >
        <ChevronRight className="size-4" />
      </Button>
    </>
  );
}
