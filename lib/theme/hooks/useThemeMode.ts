import { Themes } from "@lib/theme/constants"
import { useTheme } from "next-themes"

export type ThemeValueType = (typeof Themes)[keyof typeof Themes]

const useThemeMode = () => {
  const { theme, setTheme } = useTheme()

  return {
    theme: theme as ThemeValueType,
    setTheme: setTheme as (theme: ThemeValueType) => void,
    toggleTheme: () => {
      switch (theme) {
        case Themes.light: {
          setTheme(Themes.dark)
          break
        }
        default: {
          setTheme(Themes.light)
          break
        }
      }
    },
  }
}

export default useThemeMode
