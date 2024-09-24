import {
  Bookmark,
  ChevronDown,
  FileDown,
  Link,
  Star,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarBtn } from "./sidebar-btn";
import { RoutePage } from "../route-setting";

export function SidebarDropdownBtn({ pos }: { pos: string }) {
  return (
    <div className="dropdown relative flex">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md hover:bg-accent hover:text-accent-foreground">
          <SidebarBtn asChild>
            <div className="flex items-center">
              {pos === "left" ? (
                <Star className="icon mr-2 size-4" />
              ) : (
                <ChevronDown className="icon mr-2 size-4" />
              )}
              <span>모음집</span>
            </div>
          </SidebarBtn>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute bottom-1 left-7 mt-1 flex flex-col">
          <DropdownMenuItem onSelect={RoutePage(`/`)}>
            <Link className="icon mr-2 h-4 w-4" />
            <span>계정연동</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus className="icon mr-2 h-4 w-4" />
            <span>초대하기</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileDown className="icon mr-2 h-4 w-4" />
            <span>다운로드</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bookmark className="icon mr-2 h-4 w-4" />
            <span>북마크</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
