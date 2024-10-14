"use client";

import { Document } from "@/redux/features/documentsSlice"; // Document 인터페이스 가져오기

interface TitleProps {
  initialValue: Document;
}

export const Title = ({ initialValue }: TitleProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div>{initialValue.icon}</div>
      {initialValue.title}
    </div>
  );
};
