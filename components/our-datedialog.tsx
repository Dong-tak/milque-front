"use client";

import * as React from "react";
import { addDays, differenceInDays, format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function OurDateDialog() {
  let day = new Date();
  const [date, setDate] = React.useState<Date | undefined>(day);
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  const handlePreviousDay = () => {
    if (date) {
      setDate(addDays(date, -1));
    }
  };

  const handleNextDay = () => {
    if (date) {
      setDate(addDays(date, 1));
    }
  };
  const renderDateLabel = () => {
    if (!date) return <span>Pick a date</span>;
    const diff = differenceInDays(day, date);
    if (diff === 0) return "오늘";
    if (diff === 1) return "어제";
    return format(date, "yyyy.MM.dd");
  };

  return (
    <div className="flex items-center">
      <div
        className="rounded-md p-3 hover:bg-popover"
        onClick={handlePreviousDay}
      >
        <ChevronLeft className="h-4 w-4" />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"foreground"}
            className={cn(
              "others-medium-button justify-center border-none",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {renderDateLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="rounded-md p-3 hover:bg-popover" onClick={handleNextDay}>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}
