import { OurAccordion } from "@/components/our-accordion";

import { OurAlert } from "@/components/our-alert";
import { OurAlertDialog } from "@/components/our-alert-dialog";
import { OurAvatar } from "@/components/our-avatar";
import { Badge } from "@/components/ui/badge";
import { OurBreadcrumb } from "@/components/our-breadcrumb";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import {
  OurMultipleCalendar,
  OurRangeCalendar,
  OurSingleCalendar,
} from "@/components/our-calender";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { OurCarousel } from "@/components/our-carousel";
import { OurCheckbox } from "@/components/our-checkbox";
import { OurCombobox } from "@/components/our-combobox";
import { Label } from "@/components/ui/label";
import { OurCommand } from "@/components/our-command";
import {
  OurRangeDatePicker,
  OurSingleDatePicker,
} from "@/components/our-datepicker";
import { OurHoverCard } from "@/components/our-hovercard";
import { OurInputForm } from "@/components/our-input";
import { OurDropdownMenu } from "@/components/our-dropdownmenu";
import { OurMenubar } from "@/components/our-menubar";
import { OurNavigationMenu } from "@/components/our-navigationmenu";
import { OurPagination } from "@/components/our-pagination";
import { Progress } from "@/components/ui/progress";
import { OurRadioGroup } from "@/components/our-radiogroup";
import { OurSelect } from "@/components/our-select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { OurSkeleton } from "@/components/our-skeleton";
import { Slider } from "@/components/ui/slider";
import { OurSwitch } from "@/components/our-switch";
import { OurTabs, TabsDemo } from "@/components/our-tabs";
import { OurToggle } from "@/components/our-toggle";
import { OurToggleGroup } from "@/components/our-togglegroup";
import { OurTooltip } from "@/components/our-tooltip";

export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-10 p-8">
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
      <OurSingleCalendar />
      <OurRangeCalendar />
      <OurCarousel />
      <OurCheckbox />
      <OurCombobox />
      <Label htmlFor="terms">Accept terms and conditions</Label>
      <OurCommand />
      <OurSingleDatePicker />
      <OurRangeDatePicker />
      <OurHoverCard />
      <OurInputForm />
      <OurDropdownMenu />
      <OurMenubar />
      <OurNavigationMenu />
      <OurPagination />
      <Progress value={70} />
      <OurRadioGroup />
      <OurRadioGroup className="flex" />
      <OurSelect />
      <Separator />
      <OurSkeleton />
      <Slider disabled defaultValue={[33]} max={100} step={1} />
      <OurSwitch />
      <TabsDemo />
      <OurTabs />
      <OurToggle />
      <OurToggleGroup />
      <OurTooltip />
    </div>
  );
}
