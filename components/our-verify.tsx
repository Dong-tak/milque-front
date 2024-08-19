import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Github, Instagram } from "lucide-react";
import Link from "next/link";
import { OurTooltip } from "./our-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export function OurVerify() {
  return (
    <Card className="relative h-[982px] w-[756px] space-y-6 bg-background px-[166px] py-[382px]">
      <CardHeader className="p-0">
        <div>
          <Button variant={"ghost"} className="absolute left-16 top-16 gap-2">
            <ArrowLeft className="h-4 w-4" />
            뒤로가기
          </Button>
          <Button variant={"ghost"} className="absolute right-16 top-16">
            로그인
          </Button>
        </div>
        <CardTitle>인증하기</CardTitle>
        <CardDescription>인증번호를 입력하세요!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-0">
        <div className="space-y-[6px]">
          <div className="flex items-end justify-between">
            <Label htmlFor="email">인증번호</Label>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="verify"
                      className="underline underline-offset-2"
                    >
                      혹시 인증메일이 오지 않았나요?
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>다시 보내세요!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex gap-2">
            <Input id="verifyCode" />
            <Button
              variant={"default"}
              size={"icon"}
              className="h-10 w-10 flex-shrink-0"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button size={"long"}>MileQue 시작하기</Button>
      </CardContent>
    </Card>
  );
}
