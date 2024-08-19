"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface OurCheckboxProps {
  disabled?: boolean;
  size?: string;
  children?: React.ReactNode;
}

export function OurCheckbox({
  disabled = false,
  size = "sm",
  children,
}: OurCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" disabled={disabled} />
      <label
        htmlFor="terms"
        className="text-foreground body-normal-body-01 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
}

export function OurColorCheckbox({
  disabled = false,
  size = "sm",
  children,
}: OurCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms1" disabled={disabled} />
      <label
        htmlFor="terms1"
        className="text-accent-foreground body-normal-body-01 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {children}
      </label>
    </div>
  );
}
