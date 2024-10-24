// app/board/page.tsx
"use client";

import React from "react";

import dynamic from "next/dynamic";

const DrawingBoard = dynamic(
  () => import("../_components/board/drawingboard"),
  {
    ssr: false,
  },
);

export default function BoardPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DrawingBoard />
    </div>
  );
}
