import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function DetailBtmNav() {
  return (
    <div className="fixed bottom-0 flex h-[48px] items-center justify-between bg-background md:bottom-6 md:min-w-[310px] md:max-w-[500px]">
      <div className="flex w-full gap-4 px-4">
        <Input
          placeholder="새로운 커멘트 남기기"
          className="w-full border-none"
        />
        <Button variant="ghost" className="text-primary">
          등록
        </Button>
      </div>
    </div>
  );
}
