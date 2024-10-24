import React from "react";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full">
      {/* 여기에 공통 레이아웃 요소를 추가할 수 있습니다 */}
      {children}
    </main>
  );
}
