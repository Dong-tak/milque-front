import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Eye, Check } from "lucide-react";
import Image from "next/image";
import { flattenBy } from "@tanstack/react-table";

interface SettingAlertDialogProps {
  buttonName: string;
  dialogTitle: string;
  dialogDescription: string;
  buttonClassName?: string;
  button: React.ReactNode; //버튼을 외부에서 주입 받도록 추가
  label_1_title?: string;
  label_2_title?: string;
  label_3_title?: string;
}

export function SettingAlertDialog({
  dialogTitle,
  dialogDescription,
  button,
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SettingOneLabel({
  buttonName,
  dialogTitle,
  dialogDescription,
  buttonClassName,
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={buttonClassName}>
          {buttonName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full space-y-5">
          <div className="space-y-[6px]">
            <Input
              className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
              placeholder="Field Name or Example"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SettingTwoLabel({
  dialogTitle,
  dialogDescription,
  label_1_title,
  label_2_title,
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>버튼</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full space-y-5">
          <div className="space-y-[6px]">
            <div>
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                {label_1_title}
              </Label>
            </div>
            <Input
              className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
              placeholder="Field Name or Example"
            />
          </div>
          <div className="space-y-[6px]">
            <div>
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                {label_1_title}
              </Label>
            </div>
            <Input
              className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
              placeholder="Field Name or Example"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SettingAlertLink({
  buttonName,
  dialogTitle,
  dialogDescription,
  buttonClassName,
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={buttonClassName}>
          {buttonName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full space-y-5">
          <div className="items-center space-y-[6px]">
            <div>
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                초대 링크
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                className="font-['SUIT Variable'] shrink grow basis-0 bg-muted text-sm font-normal leading-tight text-slate-400"
                placeholder="https://www.mileque.com/invite/velroy030/ofikjsdfo342"
              />
              <Button variant="outline" className="p-3">
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex grid-cols-3 items-center gap-2">
            <div className="relative h-0.5 w-full max-w-full flex-1 shrink-0 overflow-hidden bg-border"></div>
            <div className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-400">
              OR ADD WITH
            </div>
            <div className="relative h-0.5 max-w-full flex-1 shrink-0 overflow-hidden bg-border"></div>
          </div>
          <div className="space-y-[6px]">
            <div>
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                아이디 입력
              </Label>
            </div>
            <Input
              className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
              placeholder="Field Name or Example"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const SettingMediaSlect: React.FC<SettingAlertDialogProps> = ({
  buttonName,
  dialogTitle,
  dialogDescription,
  buttonClassName,
}) => {
  const [isClicked, setClickedStates] = useState([
    false, // Facebook
    false, // Instagram
    false, // WhatsApp
    false, // X Twitter
    false, // Discord
    false, // LinkedIn
    false, // Youtube
    false, // Tiktok
  ]);

  const handleClick = (index: number) => {
    const newClickedStates = [...isClicked];
    newClickedStates[index] = !newClickedStates[index];
    setClickedStates(newClickedStates);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={buttonClassName}>
          {buttonName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="font-inter relative flex w-full flex-row items-start justify-start gap-4 text-left text-sm text-secondary-foreground">
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[0] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(0)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="social-media/icon-Facebook.svg"
                  width={24}
                  height={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[0] ? "text-slate-950" : "text-slate-500"}`}
                >
                  Facebook
                </div>
              </Button>
            </div>
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[1] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(1)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="social-media/icon-instagram.svg"
                  width={24}
                  height={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[1] ? "text-slate-950" : "text-slate-500"}`}
                >
                  instagram
                </div>
              </Button>
            </div>
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[2] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(2)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="social-media/icon-whats-app.svg"
                  width={24}
                  height={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[2] ? "text-slate-950" : "text-slate-500"}`}
                >
                  WhatsApp
                </div>
              </Button>
            </div>
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[3] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(3)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/social-media/icon-x-twitter.png"
                  width={24}
                  height={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[3] ? "text-slate-950" : "text-slate-500"}`}
                >
                  (X) Twitter
                </div>
              </Button>
            </div>
          </div>
          <div className="font-inter relative flex w-full flex-row items-start justify-start gap-4 text-left text-sm text-secondary-foreground">
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[4] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(4)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/social-media/icon-discord.png"
                  width={24}
                  height={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[4] ? "text-slate-950" : "text-slate-500"}`}
                >
                  Discord
                </div>
              </Button>
            </div>
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[5] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(5)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className={`relative h-6 w-6 shrink-0 overflow-hidden`}
                  alt=""
                  src="/social-media/icon-linkedin.png"
                  height={24}
                  width={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[5] ? "text-slate-950" : "text-slate-500"}`}
                >
                  linkedin
                </div>
              </Button>
            </div>
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[6] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(6)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/social-media/icon-youtube.png"
                  width={24}
                  height={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[6] ? "text-slate-950" : "text-slate-500"}`}
                >
                  Youtube
                </div>
              </Button>
            </div>
            <div
              className={`flex flex-1 flex-row items-center justify-center rounded-md border-[1px] ${isClicked[7] ? "border-slate-900" : "border-slate-300"} border-solid bg-card px-0`}
              onClick={() => handleClick(7)}
            >
              <Button className="flex w-full flex-col items-center justify-start gap-3 bg-background py-3 hover:bg-background">
                <Image
                  className="relative h-6 w-6 shrink-0 overflow-hidden"
                  alt=""
                  src="/social-media/icon-tiktok.png"
                  width={24}
                  height={24}
                />
                <div
                  className={`relative font-medium leading-[20px] ${isClicked[7] ? "text-slate-950" : "text-slate-500"}`}
                >
                  Tiktoc
                </div>
              </Button>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// 오른쪽 화살표 버튼
// <Button className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-md bg-background p-3 hover:bg-background">
//   <ChevronRight className="relative h-4 w-4 text-black" />
// </Button>;

// 드롭다운 버튼
// <Button
//   variant="outline"
//   className="justify-between gap-2 border-none"
// >
//   {dropdownTitle}
//   <ChevronDown className="h-4 w-4" />
// </Button>;

//버튼 형태
// <Button variant="outline" className={className}>
//   {buttonTitle}
// </Button>;
