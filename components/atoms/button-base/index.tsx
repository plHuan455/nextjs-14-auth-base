import React from "react"
import { type VariantProps, tv } from "tailwind-variants"

import { cn } from "lib/utils/cn"

import LoadingDots from "../loading-dots"

export const buttonBaseVariants = tv(
  {
    base: "a-button flex items-center justify-center [&:not(:disabled)]:active:opacity-[0.92] relative font-content rounded-full duration-200 whitespace-nowrap leading-normal active:scale-[0.98] disabled:active:scale-100",
    variants: {
      color: {
        primary: "bg-primary [&:not(:disabled)]:hover:bg-primary/90 text-white",
        secondary: "bg-secondary text-white",
        default_200: "bg-default-200 hover:bg-default-100",
        default_300: "bg-default-300 hover:bg-default-200",
        default: "bg-default",
        black: "bg-black hover:bg-default-700 text-white",
      },
      size: {
        56: "h-[56px] px-8 text-[18px]",
        48: "h-12 px-6 text-[1rem]",
        40: "h-10 px-4",
      },
      variant: {
        text: "bg-transparent",
        default: "",
      },
      disabled: {
        true: "opacity-70 !cursor-not-allowed",
      },
      isLoading: {
        true: "",
        false: "",
      },
      isIconOnly: {
        true: "aspect-square w-auto p-0",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "text",
        color: "black",
        className: "text-black hover:text-white",
      },
    ],
    defaultVariants: {
      color: "primary",
      isIconOnly: false,
      size: 56,
      variant: "default",
    },
  },
  {
    responsiveVariants: ["sm", "md", "lg"],
  },
)

export interface ButtonBaseProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color" | "disabled">,
    VariantProps<typeof buttonBaseVariants> {
  as?: React.ElementType
}

const ButtonBase = React.forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, as = "button", children, isLoading, isIconOnly, variant, color, size, disabled, ...props }, ref) => {
    const Component = as
    return (
      <Component
        className={cn(
          buttonBaseVariants({ size, color, variant, isIconOnly, disabled: disabled || isLoading }),
          className,
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* LABEL */}
        {isLoading ? <LoadingDots className="text-white" /> : children}
      </Component>
    )
  },
)

ButtonBase.displayName = "ButtonBase"

export { ButtonBase }
