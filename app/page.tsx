import { OurAccordion } from "@/components/our-accordion";
import { getData } from "./action";

import { OurAlert } from "@/components/our-alert";
import { OurAlertDialog } from "@/components/our-alert-dialog";
import { OurAvatar } from "@/components/our-avatar";
import { Badge } from "@/components/ui/badge";
import { OurBreadcrumb } from "@/components/our-breadcrumb";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import { OurCalendar } from "@/components/our-calender";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default async function Home() {
  const posts = await getData();
  return (
    <div className="flex flex-col items-start gap-10 p-8">
      <OurAccordion />
      <OurAlert />
      <OurAlertDialog />
      <div className="flex items-center gap-4">
        <OurAvatar className="size-20" />
        <OurAvatar />
      </div>
      <div className="flex gap-4">
        <Badge>Badge</Badge>
        <Badge variant={"secondary"}>Badge</Badge>
        <Badge variant={"destructive"}>Badge</Badge>
        <Badge variant={"outline"}>Badge</Badge>
      </div>
      <OurBreadcrumb />
      <div className="flex gap-4">
        <Button>Button Label</Button>
        <Button size={"sm"}>Button Label</Button>
        <Button size={"lg"}>Button Label</Button>
        <Button size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
      <div className="flex gap-4">
        <Button disabled>Button Label</Button>
        <Button disabled size={"sm"}>
          Button Label
        </Button>
        <Button disabled size={"lg"}>
          Button Label
        </Button>
        <Button disabled size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
      <div className="flex gap-4">
        <Button disabled variant={"destructive"}>
          Button Label
        </Button>
        <Button variant={"destructive"} size={"sm"}>
          Button Label
        </Button>
        <Button variant={"destructive"} size={"lg"}>
          Button Label
        </Button>
        <Button variant={"destructive"} size={"icon"}>
          <PlusIcon />
        </Button>
      </div>
      <div className="flex gap-4">
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading
        </Button>
        <Button variant={"foreground"} disabled className="bg-input">
          Button Label
        </Button>
      </div>
      <OurCalendar />
    </div>
  );
}
