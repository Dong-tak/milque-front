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
import { X, Menu, ChevronLeft } from "lucide-react";

const DialogClose = DialogPrimitive.Close;

export function OurOption() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // 사이드바 토글 함수

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          옵션설정
        </Button>
      </DialogTrigger>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <DialogContent className="flex max-h-[90vh] w-full max-w-[90%] flex-shrink-0 flex-col overflow-y-auto bg-white shadow-lg">
            {/* 상단바 (작은 화면에서만 보임) */}
            <div className="flex w-full items-center justify-between bg-background p-4 shadow-md md:hidden">
              <ChevronLeft className="h-6 w-6" />
              <span className="text-center text-xl font-bold">프로필 설정</span>
              <Menu className="h-6 w-6" onClick={toggleSidebar} />
            </div>

            <div className="flex w-full flex-grow">
              {/* 사이드바 */}
              <div
                className={`${
                  isSidebarOpen || window.innerWidth >= 764 ? "block" : "hidden"
                } right-0 z-30 flex-shrink-0 border-r bg-white md:left-0`}
              >
                <OurOptionSidebar />
              </div>

              {/* Content view */}
              <div className="flex flex-grow flex-col p-8">
                <DialogHeader className="flex h-auto w-full flex-col items-start gap-2 border-b py-4">
                  <DialogTitle className="font-['SUIT Variable'] h-auto w-full text-xl font-bold leading-7 text-slate-900">
                    프로필 설정
                  </DialogTitle>
                  <DialogDescription className="font-['SUIT Variable'] h-auto text-sm font-normal leading-tight text-slate-400">
                    친구들에게 보여지는 나의 정보입니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex w-full flex-grow flex-col gap-6">
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
              <div className="hidden h-full xl:block xl:w-[250px]">
                {/* 우측 빈공간 - 브레이크 포인트 1100px 보다 작으면 없어짐 */}
              </div>
            </div>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
