import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OurAlertProps {
  variant?: "default" | "destructive" | null | undefined;
}

export function OurAlert({ variant }: OurAlertProps) {
  return (
    <Alert variant={variant} className="w-[634px]">
      <div className="flex gap-2">
        <CircleAlert className="m-1 size-4" />
        <div>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
