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

interface MediaSlectDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  button: React.ReactNode; //버튼을 외부에서 주입 받도록 추가
  label_1_title?: string;
  label_2_title?: string;
  label_3_title?: string;
}

export const MediaSlect: React.FC<MediaSlectDialogProps> = ({
  dialogTitle,
  dialogDescription,
  button,
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
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
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
