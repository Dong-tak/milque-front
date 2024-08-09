import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function OurAlert() {
  return (
    <Alert variant="destructive" className="w-[634px]">
      <div className="flex gap-3">
        <CircleAlert className="size-4" />
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
