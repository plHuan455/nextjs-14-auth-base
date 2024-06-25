import { LOCALES } from "@lib/i18/constants"
import { Pathnames } from "next-intl/navigation"
import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"

export const pathnames = {} satisfies Pathnames<typeof LOCALES>

// Use the default: `always`
export const localePrefix = undefined

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale)) notFound()

  return {
    messages: (await import(`../content/${locale}.json`)).default,
  }
})
