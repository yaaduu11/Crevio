import * as React from "react"

import { cn } from "../../lib/utils"

const AdminInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-0 focus:border-none",
            className
          )}
          ref={ref}
          {...props}
        />
      )
    }
  );
  
AdminInput.displayName = "Input"

export { AdminInput }
