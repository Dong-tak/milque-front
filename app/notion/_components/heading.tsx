"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const Heading = () => {
  const router = useRouter();
  const EnterButtonClick = () => {
    router.push("/notion/main/documents");
  };
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl">
        Your Ideas, Documents, & Plans. Welcome to{" "}
        <span className="underline">Yotion</span>
      </h1>
      <h3 className="text-base font-medium">
        Yoution is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      <Button onClick={EnterButtonClick}>
        Enter Yotion
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
