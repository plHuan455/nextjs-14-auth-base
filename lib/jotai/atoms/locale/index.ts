import { DEFAULT_LOCALE } from "@constants/locale"
import { atom } from "jotai"

interface ILocale {
  locale?: string
}

export const localeAtom = atom<ILocale>({
  locale: DEFAULT_LOCALE,
})
