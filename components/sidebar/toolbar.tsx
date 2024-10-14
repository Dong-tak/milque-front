"use client";

import { Document, updateDocument } from "@/redux/features/documentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { IconPicker } from "../icon-picker";
import { Button } from "../ui/button";
import { Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { RootState } from "@/redux/store";
import TextareaAutosize from "react-textarea-autosize";

interface ToolbarProps {
  initialData: Document;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [nowIcon, setNowIcon] = useState(initialData.icon);
  const dispatch = useDispatch();
  const document = useSelector((state: RootState) => state.documents.items);

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    dispatch(
      updateDocument({
        id: initialData.id,
        title: value || "Untitled",
        icon: nowIcon,
      }),
    );
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    setNowIcon(icon);
    dispatch(
      updateDocument({ id: initialData.id, icon, title: value || "Untitled" }),
    );
  };

  const removeIcon = () => {
    dispatch(
      updateDocument({
        id: initialData.id,
        icon: undefined,
        title: value || "Untitled",
      }),
    );
  };

  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && (
        <div className="group/icon flex items-center gap-x-2 pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl font-bold transition hover:opacity-75">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={removeIcon}
            className="rounded-full text-muted-foreground opacity-0 transition group-hover/icon:opacity-100"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex items-center gap-x-1 py-4">
        {!initialData.icon && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-sm text-muted-foreground"
              variant="outline"
              size="sm"
            >
              <Smile className="mr-2 h-4 w-4" />
              Add icon
            </Button>
          </IconPicker>
        )}
      </div>
      {isEditing ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={(e) => onInput(e.target.value)}
          value={value}
          className="resize-none break-words bg-transparent text-5xl font-bold outline-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="ouline-none break-words pb-[11.5px] text-5xl font-extrabold"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
