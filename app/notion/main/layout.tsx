import { ReactNode } from "react";
import Navigation from "./_components/navigation";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default MainLayout;
