//팝업 창 생성 컴포넌트
import { ArrowLeft, Pin, SquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CreateBoardDialogProps {
  contentTitle: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  open?: boolean; // open prop 추가
  onOpenChange?: (open: boolean) => void; // onOpenChange prop 추가
}

export default function CreateBoardDialog({
  contentTitle,
  handleInputChange,
  handleSaveClick,
  className,
  open,
  onOpenChange,
}: CreateBoardDialogProps) {
  // Ctrl+Enter 핸들러 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSaveClick(e as any);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`w-full gap-5 rounded-md bg-popover p-6 ${className}`}
      >
        <div className="grid w-full items-center gap-1.5">
          <Input
            id="title"
            value={contentTitle}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // 키 이벤트 핸들러 추가
            className="w-full border-none"
            placeholder="Enter your focus"
            autoFocus // 자동 포커스 추가
          />
        </div>
        <DialogFooter className="flex items-end justify-end gap-2">
          <Button variant={"outline"} onClick={() => onOpenChange?.(false)}>
            <ArrowLeft className="icon mr-2 size-4" />
            뒤로가기
          </Button>
          <Button id="scrap-save-btn" type="submit" onClick={handleSaveClick}>
            저장하기
            <Pin className="icon ml-2 size-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
