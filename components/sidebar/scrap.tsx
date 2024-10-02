import { ArrowLeft, Pin, SquarePlus } from "lucide-react";
import { SidebarBtn } from "../shadcn/sidebar-btn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface ScrapDialogProps {
  user_id?: number;
  contentUrl: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function ScrapDialog({
  user_id,
  contentUrl,
  handleInputChange,
  handleSaveClick,
  className,
}: ScrapDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {user_id ? (
          <SidebarBtn id="scrap-sidebar">
            <SquarePlus className="icon mr-2 size-4" />
            <span>스크랩</span>
          </SidebarBtn>
        ) : (
          <SidebarBtn id="scrap-sidebar-disabled" disabled>
            <SquarePlus className="icon mr-2 size-4" />
            <span>스크랩</span>
          </SidebarBtn>
        )}
      </DialogTrigger>
      <DialogContent
        className={`w-full gap-5 rounded-md bg-popover p-6 ${className}`}
      >
        <DialogHeader>
          <DialogTitle className="w-full pb-2 display-undefine-display-01">
            스크랩할 페이지를 입력하세요
          </DialogTitle>
          <DialogDescription className="w-full body-normal-body-02">
            링크를 입력하고 바로 저장하세요!
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="url">Link</Label>
          <Input
            id="url"
            value={contentUrl}
            onChange={handleInputChange}
            className="w-full"
            placeholder="링크를 입력하세요"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="file">File</Label>
          <Input id="file" type="file" />
        </div>
        <DialogFooter className="flex items-end justify-end gap-2">
          <Button variant={"outline"}>
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
