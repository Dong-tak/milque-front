import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import * as React from "react";

interface ArrowDropDownProps {
  title: string;
  ridioitem: string[]; // 배열의 타입 명시
}

export function DropDownArrow({ title, ridioitem }: ArrowDropDownProps) {
  const [position, setPosition] = React.useState("bottom");
  const [selectedTitle, setSelectedTitle] = React.useState(title);

  const handleValueChange = (value: string) => {
    setPosition(value);
    setSelectedTitle(value);
  };

  return (
    <div className="inline-flex h-10 flex-col items-end justify-end gap-2.5 text-secondary-foreground">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-1">
            <p>{selectedTitle}</p>
            <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
              <ChevronDown className="relative h-4 w-4 text-secondary-foreground" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={handleValueChange}
          >
            {ridioitem.map((item, index) => (
              <DropdownMenuRadioItem key={index} value={item}>
                {item}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
