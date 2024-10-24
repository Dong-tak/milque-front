import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      {/* 여기에 공통 레이아웃 요소를 추가할 수 있습니다 */}
      {children}
    </div>
  );
}
