// app/board/page.tsx
"use client";

import React from "react";
import DrawingBoard from "../_components/board/drawingboard";

export default function BoardPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DrawingBoard />
    </div>
  );
}
