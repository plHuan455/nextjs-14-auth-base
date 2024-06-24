import { LOCALES } from "constants/locale"
import { createLocalizedPathnamesNavigation } from "next-intl/navigation"

import { localePrefix, pathnames } from "./i18n"

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales: LOCALES,
  pathnames,
  localePrefix,
})
