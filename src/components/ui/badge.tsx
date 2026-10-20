import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono-tech uppercase tracking-[0.16em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#14182A]/90 text-[#A79AFF] border border-[#A79AFF]/25",
        signal:
          "bg-[#6E5BFF]/15 text-[#F4F0FF] border border-[#6E5BFF]/45 shadow-[0_0_16px_-4px_rgba(110,91,255,0.45)]",
        subtle:
          "bg-[#0D0F18]/90 text-[#A7A6B8] border border-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
