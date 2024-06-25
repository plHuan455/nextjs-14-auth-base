"use client"

import { ThemeProvider as ThemeProviderLib } from "next-themes"
import React from "react"

import { THEME_DEFAULT, Themes } from "./constants"

interface Props {
  children: React.ReactNode
}
export default function ThemeProviderBase({ children }: Props) {
  return (
    <ThemeProviderLib
      defaultTheme={THEME_DEFAULT}
      attribute="class"
      themes={Object.values(Themes)}
      enableSystem={false}
    >
      {children}
    </ThemeProviderLib>
  )
}
