"use client";

import { cn } from "@/lib/utils";
import { WeekNumberProps } from "react-day-picker";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { addDocument, deleteDocument } from "@/redux/features/documentsSlice";

interface ItemProps {
  id?: string;
  expanded?: boolean;
  level?: number;
  onClick: () => void;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  documentIcon?: string;
  isSearch?: boolean;
  onExpand?: (id?: string) => void;
}

const Item = ({
  id,
  level,
  expanded = false,
  onClick,
  label,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  onExpand,
}: ItemProps) => {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  const dispatch = useDispatch();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    onExpand?.(id);
  };
  const handleCreateNote = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch(addDocument({ title: "Untitled", parentId: id }));
    if (!expanded) {
      onExpand?.();
    }
  };

  const handleDeleteNote = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    if (id) {
      dispatch(deleteDocument(id));
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-neutral-200",
        active && "bg-primary",
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrnk-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shirink-0 mr-2 h-[18px] text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            onClick={handleCreateNote}
            className="rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover:opacity-100"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
          <div
            onClick={handleDeleteNote}
            className="rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};

export default Item;
