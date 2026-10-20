import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-sm font-medium transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-[#A79AFF] focus-visible:outline-offset-2 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#6E5BFF] text-[#F4F0FF] border border-[#A79AFF]/40 shadow-[0_0_28px_-4px_rgba(110,91,255,0.55)] hover:bg-[#7D6BFF] hover:border-[#F4F0FF]/60 hover:shadow-[0_0_38px_-2px_rgba(167,154,255,0.65)] active:opacity-90",
        orbital:
          "bg-[#14182A]/80 text-[#F4F0FF] border border-[#A79AFF]/30 backdrop-blur-md hover:bg-[#1E2440]/90 hover:border-[#A79AFF]/65 hover:shadow-[0_0_24px_-6px_rgba(167,154,255,0.35)]",
        ghost:
          "bg-transparent text-[#A7A6B8] hover:text-[#F4F0FF] hover:bg-[#14182A]/50 border border-transparent hover:border-[#A79AFF]/15",
        outline:
          "bg-transparent text-[#F4F0FF] border border-[#A79AFF]/25 hover:border-[#A79AFF]/65 hover:bg-[#6E5BFF]/10",
      },
      size: {
        default: "h-12 px-6 py-3 rounded-none tracking-wide",
        sm: "h-10 px-4 py-2 rounded-none text-xs tracking-wider uppercase font-mono-tech",
        lg: "h-14 px-8 py-4 rounded-none text-base tracking-wide",
        icon: "h-11 w-11 rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
