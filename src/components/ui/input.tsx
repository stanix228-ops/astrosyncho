import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl bg-[#0D0F18]/90 border border-[#A79AFF]/20 px-4 py-3 text-sm text-[#F4F0FF] placeholder:text-[#A7A6B8]/55 transition-colors duration-200 focus-visible:border-[#A79AFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E5BFF]/35 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
