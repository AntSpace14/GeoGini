import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "@/lib/utils";
import { rainbowButtonVariants } from "./rainbow-button-variants";

const RainbowButton = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-slot="button"
        className={cn(rainbowButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

RainbowButton.displayName = "RainbowButton";

export { RainbowButton };
