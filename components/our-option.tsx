"use client";
import { useState } from "react";
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
import { OurOptionSidebar } from "./our-optionsidebar";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const DialogClose = DialogPrimitive.Close;

export function OurOption() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          옵션설정
        </Button>
      </DialogTrigger>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex h-screen items-center justify-center bg-[#1E293B] bg-opacity-50 px-[72px] py-[24px]">
          <DialogContent className="flex h-auto max-w-[1200px] flex-shrink flex-grow items-start justify-center bg-white shadow-lg">
            {/* Side bar */}
            <div className="flex h-[743px] w-[250px] flex-shrink-0 items-center justify-center border-r">
              <OurOptionSidebar />
            </div>
            {/* Content view */}
            <div className="relative flex h-[743px] min-h-0 w-[636px] min-w-0 flex-grow items-center justify-center">
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
                  <div className="w-full flex-col items-center space-y-2">
                    <Label htmlFor="name" className="text-lift">
                      닉네임
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="w-full" />
                    <DialogDescription className="font-['SUIT Variable'] h-auto text-sm font-normal leading-tight text-slate-400">
                      닉네임은 한 번 설정하면 수정이 어렵습니다. 해당 계정으로
                      이메일도 만들어집니다.
                    </DialogDescription>
                  </div>
                  <div className="w-full flex-col items-center space-y-2">
                    <Label htmlFor="username" className="text-lift">
                      프로필 사진
                    </Label>
                    <Input id="username" value="@peduarte" className="w-full" />
                  </div>
                </div>
                <DialogFooter className="flex">
                  <Button type="submit">초기화</Button>
                  <Button type="submit">수정하기</Button>
                </DialogFooter>
              </div>
            </div>
            <div className="hidden h-full xl:block xl:w-[250px]">
              {/* 우측 빈공간 - 브레이크 포인트 1100px 보다 작으면 없어짐 */}
            </div>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
