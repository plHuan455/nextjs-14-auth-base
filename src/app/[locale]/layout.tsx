import JotaiProvider from "@comp/templates/jotai-provider"
import ThemeProviderBase from "@comp/templates/theme-provider"
import { LOCALE_CONSTANTS } from "constants/locale"
import { NextIntlClientProvider, useMessages } from "next-intl"

import QueryClientWrapper from "components/templates/query-client-wrapper"

import "../../../styles/index.scss"

interface RootLayoutProps {
  children: React.ReactNode
  locale: never
}
export default function RootLayout({ children, locale }: RootLayoutProps) {
  const messages = useMessages()
  return (
    <html lang={locale || LOCALE_CONSTANTS.vi} className={`font-sans`}>
      <body>
        <ThemeProviderBase>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <QueryClientWrapper>
              <JotaiProvider>{children}</JotaiProvider>
            </QueryClientWrapper>
          </NextIntlClientProvider>
        </ThemeProviderBase>
      </body>
    </html>
  )
}
