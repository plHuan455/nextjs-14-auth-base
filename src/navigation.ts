import { LOCALES } from "@lib/i18/constants"
import { createLocalizedPathnamesNavigation } from "next-intl/navigation"

import { localePrefix, pathnames } from "./i18n"

export const { Link, redirect, usePathname, useRouter } = createLocalizedPathnamesNavigation({
  locales: LOCALES,
  pathnames,
  localePrefix,
})
