import { LOCALES } from "constants/locale"
import createMiddleware from "next-intl/middleware"

import { pathnames } from "./i18n"

export default createMiddleware({
  // Add locales you want in the app
  locales: LOCALES,
  localePrefix: "as-needed",
  pathnames: pathnames,
  // Default locale if no match
  defaultLocale: "vi",
  localeDetection: false,
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/((?!api|static|favicon|.*\\..*|_next).*)", "/(en|vi)/:path*"],

  // matcher: ["/((?!api|_next/static|_next/image|images/|favicon.ico|assets|js|robots|sitemap).*)"],
}
