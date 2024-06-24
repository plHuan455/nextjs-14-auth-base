"use client"

import { THEME_CONSTANT } from "@constants/common"
import { ThemeProvider as ThemeProviderLib } from "next-themes"
import React from "react"

interface Props {
  children: React.ReactNode
}
export default function ThemeProviderBase({ children }: Props) {
  return (
    <ThemeProviderLib
      defaultTheme={THEME_CONSTANT.light}
      attribute="class"
      themes={Object.values(THEME_CONSTANT)}
      enableSystem={false}
    >
      {children}
    </ThemeProviderLib>
  )
}
