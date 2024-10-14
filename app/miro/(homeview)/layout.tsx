import React from "react";
import { Sidebar } from "../_components/sidebar";
import { OrgSidebar } from "../_components/org-sidebar";
import { Navbar } from "../_components/sidebar/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="h-full pl-[60px]">
        <div className="flex h-full gap-x-3">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
