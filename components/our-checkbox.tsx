"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface OurCheckboxProps {
  disabled?: boolean;
  size?: string;
}

export function OurCheckbox({
  disabled = false,
  size = "sm",
}: OurCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" disabled={disabled} />
      <label
        htmlFor="terms"
        className="body-normal-body-01 text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}

export function OurColorCheckbox({
  disabled = false,
  size = "sm",
}: OurCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms1" disabled={disabled} />
      <label
        htmlFor="terms1"
        className="body-normal-body-01 text-accent-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept
      </label>
    </div>
  );
}
