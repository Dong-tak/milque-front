import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex badge items-center others-medium-tag rounded-full border px-3 py-0 head-bold-subhead-01 transition-colors ",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive",
        gray: "text-muted-foreground",
        black: "text-foreground bg-background border-foreground",
        outlineDefault: "border-accent-foreground text-accent-foreground",
        outlineSecondary: "border-secondary text-secondary",
        outlineDestructive: "border-destructive text-destructive",
        outlineBlack: "border-foreground text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const sqBadgeVariants = cva(
  "inline-flex sq-badge items-center others-medium-tag rounded-[4px] border px-2 py-0 head-bold-subhead-01 transition-colors ",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive",
        gray: "text-muted-foreground",
        black: "text-foreground bg-background border-foreground",
        outlineDefault: "border-accent-foreground text-accent-foreground",
        outlineSecondary: "border-secondary text-secondary",
        outlineDestructive: "border-destructive text-destructive",
        outlineBlack: "border-foreground text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

function SqBadge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(sqBadgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants, SqBadge, sqBadgeVariants };
