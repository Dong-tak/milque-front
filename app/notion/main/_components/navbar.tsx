"use client";

import { RootState } from "@/redux/store";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Title } from "./title";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const dispatch = useDispatch();
  const params = useParams();
  const documents = useSelector((state: RootState) => state.documents.items);

  const document = documents[params.documentsId as string];

  if (document === undefined) {
    return <p>Loading...</p>;
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="flex w-full items-center gap-x-4 bg-background px-3 py-2">
        {isCollapsed && (
          <MenuIcon
            onClick={onResetWidth}
            role="button"
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex w-full items-center">
          <Title initialValue={document} />
        </div>
      </nav>
    </>
  );
};
