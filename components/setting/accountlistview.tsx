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
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  SettingButton,
  SettingCard,
  SettingSwitch,
  SettingDropDown,
  SettingProfile,
} from "@/components/setting/settingcomp";

export function AccountListView() {
  return (
    <div className="flex h-full w-full flex-grow flex-col space-y-6 overflow-auto p-8">
      <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
        <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
          소셜 계정 설정
        </DialogTitle>
        <DialogDescription className="font-['SUIT Variable'] h-auto text-sm font-normal leading-tight text-slate-400">
          마일퀘와 연동되어 스크랩이 가능한 계정 리스트입니다.
        </DialogDescription>
      </DialogHeader>
      <div className="flex w-full flex-grow flex-col gap-6">
        <div className="w-full flex-col items-center space-y-2">
          <Label htmlFor="name" className="text-lift">
            아이디
          </Label>
          <Input id="name" value="Pedro Duarte" className="w-full" />
          <DialogDescription className="font-['SUIT Variable'] h-auto text-sm font-normal leading-tight text-slate-400">
            아이디는 한 번 설정하면 수정이 어렵습니다.
          </DialogDescription>
        </div>
        <div className="w-full flex-col items-center space-y-2">
          <Label htmlFor="username" className="text-lift">
            회사/이름/직급
          </Label>
          <Input id="username" value="@peduarte" className="w-full" />
        </div>
        <div className="w-full flex-col items-center space-y-2">
          <Label htmlFor="username" className="text-lift">
            한줄소개
          </Label>
          <Input id="username" value="@peduarte" className="w-full" />
        </div>
        <div className="w-full flex-col items-center space-y-2">
          <Label htmlFor="username" className="text-lift">
            프로핈 사진
          </Label>
          <Input id="username" value="@peduarte" className="w-full" />
        </div>
        <div className="w-full flex-col items-center space-y-2">
          <Label htmlFor="username" className="text-lift">
            비밀번호 재설정
          </Label>
          <Input id="username" value="@peduarte" className="w-full" />
        </div>
        <div className="w-full flex-col items-center space-y-2">
          <Label htmlFor="username" className="text-lift">
            비밀번호 확인
          </Label>
          <Input id="username" value="@peduarte" className="w-full" />
        </div>
      </div>
      <DialogFooter className="z-10 flex">
        <Button type="submit">초기화</Button>
        <Button type="submit">수정하기</Button>
      </DialogFooter>
    </div>
  );
}
