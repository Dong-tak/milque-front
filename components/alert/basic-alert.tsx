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

interface SettingAlertDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  buttonClassName?: string;
  button?: React.ReactNode; //버튼을 외부에서 주입 받도록 추가
  label_1_title?: string;
  label_2_title?: string;
  label_3_title?: string;
  placeholder?: string;
}

import { Input } from "@/components/ui/input";

export function BasicAlert({
  button,
  dialogTitle,
  dialogDescription,
  placeholder,
}: SettingAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="w-full space-y-5">
          <div className="space-y-[6px]">
            <Input
              className="font-['SUIT Variable'] shrink grow basis-0 text-sm font-normal leading-tight text-slate-400"
              placeholder={placeholder}
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
