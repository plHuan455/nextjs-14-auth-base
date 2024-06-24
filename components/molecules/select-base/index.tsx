"use client"

import Select, { type Props as SelectProps } from "react-select"
import { type VariantProps, tv } from "tailwind-variants"

import { cn, cnJoin } from "lib/utils/cn"

const CONTROL_VARIANTS = tv({
  base: cnJoin("px-3 rounded-md !min-h-[auto] cursor-pointer"),
  variants: {
    size: {
      48: "h-12 text-[1rem] px-6 rounded-[12px]",
      40: "h-10 text-[14px]",
      32: "h-8 text-[14px]",
    },
    color: {
      bg: "bg-primary-bg",
      bg_secondary: "bg-secondary-bg",
      primary:
        "bg-primary-btn ring-[2px] ring-transparent [&:has(input:focus)]:ring-primary [&:has(input:focus)]:bg-primary-bg",
      border: "bg-transparent border border-secondary-text/30",
    },
    shape: {
      rounded: "rounded-full",
    },
  },
  defaultVariants: {
    size: 40,
    color: "primary",
  },
})

const INPUT_VARIANTS = tv({
  base: cnJoin("leading-[100%] cursor-pointer"),
  variants: {
    size: {
      48: "text-[1rem]",
      40: "text-[1rem]",
      32: "text-[14px]",
    },
    color: {
      bg: "",
      bg_secondary: "",
      primary: "",
      border: "bg-transparent",
    },
  },
  defaultVariants: {
    size: 40,
    color: "primary",
  },
})

const MENU_LIST_VARIANTS = tv({
  base: cnJoin("bg-background mt-2 rounded-md shadow-[rgba(26,26,29,0.06)_2px_2px_8px_3px] border border-default-50"),
  variants: {
    size: {
      48: "",
      40: "",
      32: "",
    },
    color: {
      bg: "bg-background",
      primary: "bg-primary-popover",
      bg_secondary: "",
      border: "",
    },
  },
  defaultVariants: {
    size: 40,
    color: "primary",
  },
})

const OPTIONS_VARIANTS = tv({
  base: cnJoin("!cursor-pointer bg-background hover:bg-default-200"),
  variants: {
    size: {
      48: "px-3 py-2",
      40: "px-3 py-2",
      32: "px-3 py-2",
    },
    color: {
      bg: "",
      bg_secondary: "",
      primary: "",
      border: "",
    },
  },
  defaultVariants: {
    size: 40,
    color: "primary",
  },
})

interface Props extends SelectProps, VariantProps<typeof CONTROL_VARIANTS> {
  customClassNames?: {
    control?: string
  }
}

const SelectBase: React.FC<Props> = ({ size, color, shape, customClassNames = {}, ...props }) => {
  return (
    <Select
      unstyled
      classNames={{
        control: () => cn(CONTROL_VARIANTS({ size, color, shape }), customClassNames.control),
        menuList: () => cn(MENU_LIST_VARIANTS({ size, color })),
        option: () => cn(OPTIONS_VARIANTS({ size, color })),
        placeholder: () => cn(INPUT_VARIANTS({ size }), "text-secondary-text/70"),
        input: () => cn(INPUT_VARIANTS({ size, color })),
        singleValue: () => cn(INPUT_VARIANTS({ size, color })),
      }}
      {...props}
    />
  )
}

export default SelectBase
