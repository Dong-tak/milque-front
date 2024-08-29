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
import { Copy } from "lucide-react";

interface SettingAlertDialogProps {
  buttonName: string;
  dialogTitle: string;
  dialogDescription: string;
}

export function SettingAlertDialog({
  buttonName,
  dialogTitle,
  dialogDescription,
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{buttonName}</Button>
      </AlertDialogTrigger>
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

export function SettingAlertLabel({
  buttonName,
  dialogTitle,
  dialogDescription,
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{buttonName}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full space-y-5">
          <div className="space-y-[6px]">
            <div>
              <Label className="font-['SUIT Variable'] text-sm font-normal leading-tight text-slate-900">
                First name
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
                First name
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
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">{buttonName}</Button>
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
            <div className="flex items-center gap-5">
              <Input
                className="font-['SUIT Variable'] shrink grow basis-0 bg-muted text-sm font-normal leading-tight text-slate-400"
                placeholder="https://www.mileque.com/invite/velroy030/ofikjsdfo342"
              />
              <Button variant="outline" className="min-h-[10px] min-w-[10px]">
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex grid-cols-3 items-center gap-2">
            <div className="relative h-0.5 w-full max-w-full flex-1 shrink-0 overflow-hidden bg-border"></div>
            <div>OR ADD WITH</div>
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
