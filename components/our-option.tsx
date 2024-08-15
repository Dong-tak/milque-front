import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function OurOption() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <div className="relative flex flex-col items-center justify-center px-[72px] py-[24px]">
        <DialogContent className="flex items-center justify-center">
          <div className="h-full xl:w-[250px]">
            {/*사이드바 - 마일퀘설정하기*/}
          </div>
          {/*Content view*/}
          <div className="relative flex h-[743px] w-[636px] items-center justify-center">
            <div className="flex h-full w-full flex-col items-center gap-6 p-8">
              <DialogHeader className="h-auto w-full items-start gap-2 border-b py-4">
                <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
                  프로필 설정
                </DialogTitle>
                <DialogDescription className="font-['SUIT Variable'] h-auto text-sm font-normal leading-tight text-slate-400">
                  친구들에게 보여지는 나의 정보입니다.
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full flex-col gap-6">
                <div className="w-full grid-cols-4 flex-col items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    닉네임
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3 w-full"
                  />
                  <DialogDescription className="font-['SUIT Variable'] h-auto text-sm font-normal leading-tight text-slate-400">
                    닉네임은 한 번 설정하면 수정이 어렵습니다. 해당 계정으로
                    이메일도 만들어집니다.
                  </DialogDescription>
                </div>
                <div className="w-full flex-col items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    비밀번호 재설정
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter className="flex">
                <Button type="submit">초기화</Button>
                <Button type="submit">수정하기</Button>
              </DialogFooter>
            </div>
          </div>
          <div className="h-full xl:w-[250px]">
            {/* 우측 빈공간 - 브레이크 포인트 1100px 보다 작으면 없어짐 */}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
