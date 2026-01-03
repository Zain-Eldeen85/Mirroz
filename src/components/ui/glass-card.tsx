import { cn } from "@/lib/utils";
import * as React from "react";

const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-white/60 shadow-lg backdrop-blur-lg dark:bg-black/5 dark:border-white/10",
      className
    )}
    {...props}
  />
));
GlassCard.displayName = "GlassCard";

export { GlassCard };
