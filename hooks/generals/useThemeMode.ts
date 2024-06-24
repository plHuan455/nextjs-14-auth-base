import { THEME_CONSTANT } from "constants/common"
import { useTheme } from "next-themes"

export type ThemeValueType = (typeof THEME_CONSTANT)[keyof typeof THEME_CONSTANT]

const useThemeMode = () => {
  const { theme, setTheme } = useTheme()

  return {
    theme: theme as ThemeValueType,
    setTheme: setTheme as (theme: ThemeValueType) => void,
    toggleTheme: () => {
      switch (theme) {
        case THEME_CONSTANT.light: {
          setTheme(THEME_CONSTANT.dark)
          break
        }
        default: {
          setTheme(THEME_CONSTANT.light)
          break
        }
      }
    },
  }
}

export default useThemeMode
