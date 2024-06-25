import React, { CSSProperties } from "react"
import { type VariantProps, tv } from "tailwind-variants"

import { cn } from "lib/utils/cn"

export const typographyVariants = tv(
  {
    base: "typography leading-[100%]",
    variants: {
      font: {
        content: "font-content",
      },
      size: {
        100: "text-[100px] font-bold leading-[100px]",
        80: "text-[80px] font-bold leading-[80px]",
        72: "text-[72px] font-bold leading-[72px]",
        64: "text-[64px] font-bold leading-[72px]",
        48: "text-[48px] font-bold leading-[56px]",
        40: "text-[40px] leading-[56px] font-semibold",
        32: "text-[32px] leading-[48px] font-semibold",
        28: "text-[28px] leading-[36px]",
        24: "text-[24px] leading-[32px]",
        20: "text-[20px] leading-[28px]",
        18: "text-[18px] leading-[24px]",
        16: "text-[1rem] leading-[20px]",
        14: "text-[14px] leading-[20px]",
        12: "text-[12px] leading-[16px]",
      },
    },
    defaultVariants: {
      font: "content",
      size: 16,
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg", "xl"],
  },
)

export interface TypographyProps extends VariantProps<typeof typographyVariants> {
  as?: React.ElementType
  children?: React.ReactNode
  className?: string
  style?: CSSProperties
  rel?: string
  target?: string
  onClick?: (e: React.MouseEvent) => void
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ as = "p", font, size, children, className, ...props }, ref) => {
    const Component = as
    return (
      <Component className={cn(typographyVariants({ size, font }), className)} {...props} ref={ref}>
        {children}
      </Component>
    )
  },
)

Typography.displayName = "Typography"

export default Typography
