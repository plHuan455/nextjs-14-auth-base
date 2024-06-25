import React from "react"
import { type VariantProps, tv } from "tailwind-variants"

import { cn } from "lib/utils/cn"

import Typography from "../typography"

const variants = tv(
  {
    base: "a-input outline-none font-content leading-[100%]",
    variants: {
      font: {
        content: "font-content",
      },
      color: {
        default: "bg-default border-default",
        default_700: "bg-default-700",
        default_900: "bg-default-900",
      },
      error: {
        true: "border-red-500 border",
        false: "",
      },
      size: {
        52: "h-[52px] px-6 py-[14px]",
        48: "h-12 px-4 text-[16px]",
        44: "h-11 px-4 text-[1rem]",
        40: "h-10 px-4 text-[1rem]",
        16: "text-[1rem] leading-[20px]",
      },
      variant: {
        outline: "bg-transparent border-[1px]",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      font: "content",
      size: 52,
      color: "default",
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg"],
  },
)

export interface InputProps
  extends Omit<VariantProps<typeof variants>, "error">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color"> {
  className?: string
  error?: string
  wrapperProps?: Partial<React.HTMLAttributes<HTMLDivElement>>
}

const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ font, size, variant, error, className, wrapperProps, color, ...props }, ref) => {
    return (
      <div {...wrapperProps} className={cn(wrapperProps?.className, className)} ref={ref}>
        <input
          className={cn("block w-full", variants({ size, font, variant, color, error: Boolean(error) }), className)}
          {...props}
        />
        {Boolean(error) && (
          <Typography size={14} className="text-red-500 px-3 mt-0.5">
            {error}
          </Typography>
        )}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
