import {
  ChevronLeft,
  CloudDownload,
  Ellipsis,
  Eye,
  Share2,
} from "lucide-react";
import { Button } from "../ui/button";

export function DetailTopNav() {
  return (
    <div className="fixed top-0 flex items-center justify-between border-b bg-background md:top-6 md:min-w-[310px] md:max-w-[500px] md:px-4">
      <div className="flex items-center">
        <div className="p-3">
          <ChevronLeft className="size-6" />
        </div>
        <span className="accordhead others-medium-title">
          프리랜서의 성공 비결:시간 관리와 wkrlrhk
        </span>
      </div>
      <div className="flex">
        <div className="flex md:gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hidden p-1 md:block"
          >
            <CloudDownload className="size-6" />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="rounded-none md:rounded-md md:p-1"
          >
            <Share2 className="size-6" />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="hidden p-1 md:block"
          >
            <Ellipsis className="size-6" />
          </Button>
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-none md:hidden"
        >
          <Eye className="size-6" />
        </Button>
      </div>
    </div>
  );
}
