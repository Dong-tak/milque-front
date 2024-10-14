"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <div className="flex items-center gap-x-4 p-5">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <Avatar>
        <AvatarImage src="/images/avatar.png" />
        <AvatarFallback>
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
