"use client";

import { Button } from "@/components/ui/button";
import { addDocument } from "@/redux/features/documentsSlice";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch();
  const handleCreateNote = () => {
    dispatch(addDocument({ title: "Untitled" }));
  };
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        src="/images/rectangle-352.png"
        alt="Empty"
        width={300}
        height={300}
      />
      <p className="text-lg font-semibold text-foreground">
        Yotion에서 페이지를 만들어보세요.
      </p>
      <Button onClick={handleCreateNote}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
};
export default MainPage;
