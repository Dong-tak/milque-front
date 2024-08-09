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
        className={`text-${size} font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
      >
        Accept terms and conditions
      </label>
    </div>
  );
}
